import React from 'react';
import { JsonExplorerView } from 'views/JsonExplorerView';

/**
 * @Auth Aman Kalra > OGIL7190
 * @type {class}
 * @desc A React container/smart component to render a React presentational/dumb component (view).
 * @example
 * import { LoginContainer } from 'containers/LoginContainer';
 *
 * // render
 * <LoginContainer propName='propValue'/>
 */

export class JsonExplorerContainer extends React.Component {

    /**
     * @param {object} props - props
     */
    constructor( props ) {

        super( props );

        // component state
        this.state = {
            haveError: false,
            errorMessage: '',
            value: '',
            showTree: false
        };

        // bind methods to this
        this.__bind();
	}


    /**
     * @desc bind class methods to current instance
     */
    __bind() {
        this.handleInputChange = this.handleInputChange.bind( this );
        this.handleClear = this.handleClear.bind( this );
        this.showTreeStructure = this.showTreeStructure.bind( this );
    }

    handleInputChange( value ) {
        try {
            const parsed = JSON.parse( value.trim() );
            this.setState( { parsed, value, haveError: false } );
        } catch {
            if( '' === value ) {
                this.setState( { value, haveError: false } );
            } else {
                this.setState( { value, haveError: true } );
            }
        }
    }

    handleClear() {
        this.setState( { showTree: false, value: '' } );
    }

    showTreeStructure() {
        this.setState( { showTree: true } );
    }

     /**
     * @desc Render a React view component
     */
    render() {
		return (
            <JsonExplorerView
                {...this.state}
                onChange = {this.handleInputChange}
                showTreeView={this.showTreeStructure}
                onClear={this.handleClear}
            />
        );
    }
}
