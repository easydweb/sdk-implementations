#![no_std]

use gstd::{msg, prelude::*};

static mut COUNTER: i32 = 0;

#[no_mangle]
extern "C" fn handle() {
    let command = msg::load_bytes().expect("Invalid message");

    let mut counter = unsafe { COUNTER };

    match command.as_slice() {
        b"inc" => counter += 1,
        b"dec" => counter -= 1,
        b"get" => {
            msg::reply_bytes(format!("{counter}"), 0).expect("Unable to reply");
        }
        _ => (),
    }

    unsafe { COUNTER = counter };
}
