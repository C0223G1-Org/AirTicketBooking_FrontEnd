import React from 'react';
import numeral from 'numeral';
import 'numeral/locales/vi'; // Import bộ định dạng số học của Việt Nam

const CurrencyFormat = ({ value }) => {
    numeral.locale('vi'); // Sử dụng bộ định dạng số học của Việt Nam
    const formattedValue = numeral(value).format('0,0 đ');
    return <span>{formattedValue}</span>;
};

export default CurrencyFormat;