import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { FaCamera } from 'react-icons/fa';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerPhotoInput() {
  const ref = useRef();
  const { fieldName, defaultValue, registerField, error } = useField('banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    registerField({
      name: 'banner_id',
      ref: ref.current,
      path: 'dataset.file',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner do Meetup" />
        ) : (
          <div>
            <FaCamera color="#5e5c62" size={44} />
            <span>Selecionar imagem</span>
          </div>
        )}

        <input
          name={fieldName}
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
        {error && <span>{error}</span>}
      </label>
    </Container>
  );
}
