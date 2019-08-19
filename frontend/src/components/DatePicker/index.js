import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('br', ptBR);

export default function DatePicker({ name, placeholderText }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(
    defaultValue && parseISO(defaultValue)
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={60}
        onChange={date => setSelected(date)}
        placeholderText={placeholderText}
        locale="br"
        minDate={new Date()}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholderText: '',
};
