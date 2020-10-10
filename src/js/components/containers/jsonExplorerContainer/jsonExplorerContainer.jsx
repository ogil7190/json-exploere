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
            
        };

        // bind methods to this
        this.__bind();
	}


    /**
     * @desc bind class methods to current instance
     */
    __bind() {
        
    }

     /**
     * @desc Render a React view component
     */
    render() {
		return (
            <JsonExplorerView />
        );
    }
}
