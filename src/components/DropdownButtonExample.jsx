import React, { useState } from 'react';
import { Button, Dropdown, MenuItem } from 'react-photon';

const DropdownButtonExample = () => {
    const [selectedOption, setSelectedOption] = useState('Option 1');

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Dropdown and Button Example</h2>
            <div style={{ marginBottom: '20px' }}>
                <Dropdown title={selectedOption} id="dropdown-basic">
                    <MenuItem onClick={() => handleSelect('Option 1')}>Option 1</MenuItem>
                    <MenuItem onClick={() => handleSelect('Option 2')}>Option 2</MenuItem>
                    <MenuItem onClick={() => handleSelect('Option 3')}>Option 3</MenuItem>
                </Dropdown>
            </div>
            <Button >Submit</Button>
        </div>
    );
};

export default DropdownButtonExample;
