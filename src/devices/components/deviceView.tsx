import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../redux/state';
import { Device } from '../models/device';
import { submitDeviceAction } from '../actions';

export const DeviceView: React.FC = () => {
    const { id } = useParams();
    const [tags, setTags ] = React.useState<string>('');
    const { dispatch } = useDispatch();
    const matchingDevices: Device[]  = useSelector((state: StateInterface) => state.devices.devices.payload.filter(s => s.name = id));

    const onTagsChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
        setTags(value || '');
    };

    const submitClick = () => {
        dispatch(submitDeviceAction());
    };

    if (matchingDevices.length === 0) {
        return (
            <div>
                <h2>Device Twin for {id}</h2>
                <div>Not yet implemented</div>
            </div>
        );
    }

    return (
        <div>
            <h2>Device Twin for {id}</h2>
            <div>...which uses {matchingDevices[0].authentication} auth.</div>
            <TextField
                label="Tags"
                value={tags}
                onChange={onTagsChange}
            />
            <PrimaryButton
                text="Submit"
                onClick={submitClick}
            />
        </div>
    );
};
