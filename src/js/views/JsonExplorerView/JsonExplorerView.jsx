import React from 'react';
import { InputField } from 'views/generic/inputField';
import { Button } from 'views/generic/button';
import { TreeViewer } from 'views/TreeViewer';
import { isEmpty } from 'lodash';

export const JsonExplorerView = ( props ) => {
    if( props.showTree ) {return showTreeView( props );}
    return showInputView( props );
};

//////////////////////////////////////// HELPER FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


const showInputView = ( props ) => {
    return (
        <div className='ui-json-explorer'>
            <InputField
                tag= {'textarea'}
                rows= {15}
                placeholder= {'Paste JSON here to Explore'}
                onChange= {props.onChange}
                value = {props.value}
                haveError={props.haveError}
                errorMessage={'Please enter a valid JSON.'}
            />

            {
                !props.haveError && props.value && !isEmpty( props.value ) &&
                <Button
                    label={'Xplore'}
                    onClick={ props.showTreeView }
                />
            }
        </div>
    );
};

const showTreeView = ( props ) => {
    return (
        <div className='ui-json-explorer'>
            <TreeViewer
                parsedObject={props.parsed}
            />
            
            <Button
                label={'Clear'}
                bodyType={'lined'}
                onClick={ props.onClear }
            />
        </div>
    );
};

//////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

