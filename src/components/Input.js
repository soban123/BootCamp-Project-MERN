import React from 'react';
export const TextInput = ({ name, type, title, value, onChange }) => {
    return <div className="form-group">
        <label className="labels email-label" >{title}</label>
        <input
            type={type}
            className="form-control"
            id={name}
            value={value}
            onChange={onChange}
        />
    </div>
}