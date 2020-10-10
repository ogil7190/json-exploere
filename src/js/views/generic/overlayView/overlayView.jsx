import React from 'react';
import { MdClose } from 'react-icons/md';

/*
    * @Auth OGIL > Kalra
    * sizes of the button are small medium large or custom
    * body-type is filled or lined
    * action-type Primary (lined) or Secondary(filled) which changes the body type
*/
export const overlayView = ( props ) => {
    return (
        <div className = 'view-generic-overlay'>
            <div className="view-generic-overlay__container">
                <div className="view-generic-overlay__container__content">
                    {
                        props.children
                    }
                </div>
                <div className="view-generic-overlay__container__close">
                        <MdClose size = '40' onClick = { props.closeOverlay } color='white' />
                </div>
            </div>
        </div>
    );
};
