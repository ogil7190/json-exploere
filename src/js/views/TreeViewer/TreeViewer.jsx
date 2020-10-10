import { cloneDeep, isObject, isArray } from 'lodash';
import React, { useState } from 'react';

export const TreeViewer = ( props ) => {
    const { parsedObject }  = props;
    
    const [ presentation, setPresentation ] = useState( [ {
        name: 'object',
        position: '',
        children: Object.keys( parsedObject ),
        valueExpanded: false,
        value: parsedObject
    } ] );

    const expandPresentation = ( position ) => {
        const _presentation = cloneDeep( presentation );
        let target = _presentation[ 0 ];

        if( '' !== position ) {
            const split = position.split( '-' );
            
            split.map( ( pos ) => {
                target = target.value[ parseInt( pos ) ];
            } );
        }

        if( target.valueExpanded ) {
            target.valueExpanded = false;
            target.value = target.backup;
        } else {
            target.valueExpanded = true;
            target.backup = target.value;
            target.value = Object.keys( target.value ).map( ( key, index ) => {
                return {
                    name: key,
                    position: '' !== position ? position + '-' + index : `${index}`,
                    children: isObject( target.value[ key ] ) ? Object.keys( target.value[ key ] ) : [],
                    valueExpanded: false,
                    value: target.value[ key ]
                };
            } );
        }

        setPresentation( _presentation );
    };

    return (
        <div className='view-tree-viewer'>
            { renderValue( presentation, expandPresentation )}
        </div>
    );
};

//////////////////////////////////////// HELPER FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const renderValue = ( presentation, expandPresentation ) => {

    return (
        presentation &&
        <div className='view-tree-viewer__value'>
            {
                presentation.map( ( node ) => {
                    const canExpand = 0 !== node.children.length;

                    return (
                        <>
                            <span onClick={() => canExpand && expandPresentation( node.position )}>
                                { `${node.name} ---> ${node.children.length || node.value}` }
                            </span>

                            {
                                node.valueExpanded &&
                                renderValue( node.value, expandPresentation )
                            }
                        </>
                    );
                } )
            }
        </div>
    );
};

//////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
