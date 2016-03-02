// An rtForth communicating with outside through Websocket.
extern crate rtforth;
extern crate ws;
extern crate bounded_spsc_queue as spsc;

use std::rc::Rc;
use std::cell::Cell;
use std::thread;
use std::fmt::Write;
use ws::{listen, Handler, Result, Message, Handshake, CloseCode};
use rtforth::vm::VM;
use rtforth::core::Core;
use rtforth::output::Output;
use rtforth::loader::HasLoader;
use rtforth::tools::Tools;
use rtforth::env::Environment;
use rtforth::facility::Facility;
use rtforth::float::Float;

struct Server {
    out: ws::Sender,
    tx: Rc<spsc::Producer<String>>,
    rx: Rc<spsc::Consumer<String>>,
    count: Rc<Cell<usize>>,
}

impl Handler for Server {

    fn on_open(&mut self, _: Handshake) -> Result<()> {
        // We have a new connection, so we increment the connection counter
        println!("The number of live connections is {}", self.count.get() + 1);
        Ok(self.count.set(self.count.get() + 1))
    }

    fn on_message(&mut self, msg: Message) -> Result<()> {
        // TODO: watchdog
        let mut cmd;
        match msg {
          Message::Text(text) => { cmd = text; },
          _ => unreachable!(),
        }
        loop {
            match self.tx.try_push(cmd) {
                None => break,
                Some(x) => {
                  thread::sleep_ms(5);
                  cmd = x;
                },
            }
        }
        // TODO: watchdog
        loop {
            match self.rx.try_pop() {
                Some(rsp) => {
                    self.out.send(Message::Text(rsp));
                    break;
                },
                None => thread::sleep_ms(5),
            }
        }
        Ok(())
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal => println!("The client is done with the connection."),
            CloseCode::Away   => println!("The client is leaving the site."),
            _ => println!("The client encountered an error: {}", reason),
        }

        // The connection is going down, so we need to decrement the count
        self.count.set(self.count.get() - 1)
    }

    fn on_error(&mut self, err: ws::Error) {
        println!("The server encountered an error: {:?}", err);

        // The connection is going down, so we need to decrement the count
        self.count.set(self.count.get() - 1)
    }

}

fn forth_thread(
  forth_rx: &spsc::Consumer<String>,
  forth_tx: &spsc::Producer<String>
) {
  let vm = &mut VM::new(65536);
  vm.add_core();
  vm.add_output();
  vm.add_tools();
  vm.add_environment();
  vm.add_facility();
  vm.add_float();

  vm.state().auto_flush = false;
  loop {
    match forth_rx.pop() {
      text => {
        vm.set_source(&text);
        match vm.evaluate() {
          Some(e) => {
            println!("Error {:?}", e);
            forth_tx.push("err".to_string());
          },
          None => {
            let mut buf = vm.output_buffer().take().unwrap();
            writeln!(buf, " ok");
            forth_tx.push(buf.clone());
            buf.clear();
            vm.set_output_buffer(buf);
          }
        }
      }
    }
  }
}

fn main() {
    let (server_tx, forth_rx) = spsc::make(512);
    let (forth_tx, server_rx) = spsc::make(512);
    let rc_server_tx = Rc::new(server_tx);
    let rc_server_rx = Rc::new(server_rx);

    thread::spawn( move || {
        forth_thread(&forth_rx, &forth_tx);
    });

    let count = Rc::new(Cell::new(0));
    listen("127.0.0.1:3012", |out| { Server { out: out, tx: rc_server_tx.clone(), rx: rc_server_rx.clone(), count: count.clone() } }).unwrap();
    // listen("127.0.0.1:3012", |out| { Server { out: out, tx: rc_server_tx.clone(), rx: rc_server_rx.clone(), count: count.clone() } }).unwrap();

}
