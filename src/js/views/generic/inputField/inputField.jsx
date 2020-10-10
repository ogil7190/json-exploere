import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from 'lodash';
import { shortID } from 'root/src/js/utils';

/**
 * @Auth Aman Kalra > OGIL
 * @desc An input field generic component which can be used in various views.
 * can be disabled, can have a label
 * exposes a custom render function for icon or can pass icon component directly as icon prop but priority is given to render
 */
export const InputField = ( props ) => {
    const mainClasses = classnames( 'view-generic-input-field',
        props.withoutMargin && 'view-generic-input-field--without-margin',
        props.className
    );
    const inputContainerClasses = classnames( 'view-generic-input-field__container',
        'left' === props.iconPosition &&  'view-generic-input-field__icon--left',
        true === props.haveError && 'view-generic-input-field__error'
    );
    const inputClasses = classnames( 'view-generic-input-field__input', true === props.disabled && 'view-generic-input-field__input--disabled' );
    const iconClasses = classnames( props.icon && 'view-generic-input-field__input__icon' );
    const labelClasses = classnames( props.label && 'view-generic-input-field__label' );

    const TagType = 'textarea' === props.tag ? 'textarea' : 'input';

    const config = 'textarea' === props.tag ? {rows: props.rows || 4} : {};

    const value = props.stateControlByParent ? {value: props.value} : {};

    return (
        <div className = { mainClasses }>
            {
                props.label &&
                <div className = { labelClasses }>{ props.label }</div>
            }
            <fieldset className = { inputContainerClasses }>
                <TagType
                    id = { props.id }
                    placeholder = { props.placeholder }
                    className = { inputClasses }
                    type = { props.type }
                    disabled = { props.disabled }
                    onChange = { ( event ) => props.onChange( event.target.value ) }
                    {...config}
                    {...value}
                />
                {
                    props.renderIcon && props.renderIcon() /* render icon as you want */
                }
                {
                    !props.renderIcon && props.icon && <props.icon className={ iconClasses } onClick = { props.disabled ? noop : props.onIconClick }/>
                }
                {
                    props.haveError &&
                    <span className='view-generic-input-field__error__label'>
                        { props.errorMessage }
                    </span>
                }
            </fieldset>
        </div>
    );
};

InputField.defaultProps = {
    id: shortID(),
    type: 'text',
    value: '',
    iconPosition: 'right',
    onIconClick: noop,
    onChange: noop,
    disabled: false,
    haveError: false,
    errorMessage: '',
    withoutMargin: false,
    stateControlByParent: true, /* this is enabled so that the value can be controlled by logical container change this to enable self state control */
    renderIcon: null /* function but dont keep as noop */
};

InputField.proptypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    onIconClick: PropTypes.func,
    iconPosition: PropTypes.string,
    disabled: PropTypes.bool,
    withoutMargin: PropTypes.bool,
    renderIcon: PropTypes.func
};

