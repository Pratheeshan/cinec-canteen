import React from 'react';
import QRCode from 'react-qr-code';

const QR = ({qrValue}) => {
    return (
        <div>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrValue} // Pass the string value here
                viewBox={`0 0 256 256`}
            />
        </div>
    );
};

export default QR;