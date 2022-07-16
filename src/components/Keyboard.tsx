import React, { useEffect } from "react";
import Key from './Key';
import layout2 from "../assets/basicLayoutV2.json";

interface KeyboardLayout {
    columns: number;
    keys: Array<KeyItem>;
}

interface KeyItem {
    value: string | number;
    className?: string;
    columnSpan?: number;
    rowSpan?: number;
    keyEvent: string;
    hidden?: boolean;
}

type KeyboardProp = {
    formulachangeHandler: (keyEvent: string, value: string | number) => void;
};


export default function Keyboard({ formulachangeHandler }: KeyboardProp) {

    const keyboardLayout: KeyboardLayout = layout2;

    useEffect(() => {
        const onKeyboardPressed = ({ key }: globalThis.KeyboardEvent) => {
            console.log(typeof key, typeof 1)
            const keyItem = keyboardLayout.keys.find(k => k.keyEvent === key);
            if (keyItem) {
                console.log('onKeyboardPressed', key);
                formulachangeHandler(keyItem.keyEvent, keyItem.value);

            }
        };

        window.addEventListener('keydown', onKeyboardPressed, false);
        return () => window.removeEventListener('keydown', onKeyboardPressed, false);
    }, [formulachangeHandler, keyboardLayout.keys]);


    return (
        <div className={"keyboard columns-" + keyboardLayout.columns}>
            {keyboardLayout.keys.filter(k => !k.hidden).map(
                (key, index) => <Key key={index} {...key} onClick={() => formulachangeHandler(key.keyEvent, key.value)} />
            )}
        </div>
    );
}