use dep::aztec::macros::aztec;

#[aztec]
pub contract TestLog {
    use dep::aztec::macros::{events::event, functions::{private, public}, storage::storage};
    use dep::aztec::messages::logs::event::encode_and_encrypt_event;
    use dep::aztec::prelude::PrivateSet;
    use dep::aztec::protocol_types::{address::AztecAddress, traits::Serialize};
    use dep::aztec::unencrypted_logs::unencrypted_event_emission::encode_event;
    use dep::value_note::value_note::ValueNote;
    use aztec::event::event_interface::EventInterface;
    use aztec::protocol_types::traits::FromField;
    use std::meta::derive;

    #[derive(Serialize)]
    #[event]
    struct ExampleEvent0 {
        value0: Field,
        value1: Field,
    }

    #[derive(Serialize)]
    #[event]
    struct ExampleEvent1 {
        value2: AztecAddress,
        value3: u8,
    }

    #[storage]
    struct Storage<Context> {
        example_set: PrivateSet<ValueNote, Context>,
    }

    #[private]
    fn emit_encrypted_events(other: AztecAddress, preimages: [Field; 4]) {
        let event0 = ExampleEvent0 { value0: preimages[0], value1: preimages[1] };

        event0.emit(encode_and_encrypt_event(&mut context, context.msg_sender(), other));

        // We duplicate the emission, but swapping the sender and recipient:
        event0.emit(encode_and_encrypt_event(&mut context, other, context.msg_sender()));

        let event1 = ExampleEvent1 {
            value2: AztecAddress::from_field(preimages[2]),
            value3: preimages[3] as u8,
        };

        event1.emit(encode_and_encrypt_event(&mut context, context.msg_sender(), other));
    }

    #[public]
    fn emit_unencrypted_events(preimages: [Field; 4]) {
        // docs:start:emit_public
        let event0 = ExampleEvent0 { value0: preimages[0], value1: preimages[1] };

        event0.emit(encode_event(&mut context));
        // docs:end:emit_public

        let event1 = ExampleEvent1 {
            value2: AztecAddress::from_field(preimages[2]),
            value3: preimages[3] as u8,
        };

        event1.emit(encode_event(&mut context));
    }
}
