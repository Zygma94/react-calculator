import React from "react";

type KeyProp = {
    className?: string;
    value: string | number;
    columnSpan?: number;
    rowSpan?: number;
    onClick: () => void;
};


// export default function Key({ value, className, columnSpan = 1, rowSpan = 1 }: KeyProp) {
//     return (<button className={"key " + className + "column-span-" + columnSpan + "row-span-" + rowSpan}>
//         {value}
//     </button>);
// }


export default function Key({ value, className='', columnSpan = 1, rowSpan = 1, onClick }: KeyProp) {
    return (<button className={`key ${className} column-span-${columnSpan} row-span-${rowSpan}`} onClick={onClick}>
        <b>{value}</b>
    </button>);
}