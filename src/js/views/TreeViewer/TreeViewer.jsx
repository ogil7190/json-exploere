import React, { useState } from 'react';
import { cloneDeep, isObject, isArray, isString, isNumber, isNil, isBoolean } from 'lodash';
import { MdArrowDropDown, MdPlayArrow,  } from 'react-icons/md';
import { CgCopy  } from 'react-icons/cg';
import { Card } from 'views/generic/card';
import { Button } from '../generic/button';

export const TreeViewer = ( props ) => {
    const { parsedObject }  = props;
    
    const [ presentation, setPresentation ] = useState( [ {
        name: getTargetType( parsedObject ),
        position: '',
        type: getTargetType( parsedObject ),
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
            target.type = getTargetType( target.value );
            target.value = Object.keys( target.value ).map( ( key, index ) => {
                return {
                    name: key,
                    position: '' !== position ? position + '-' + index : `${index}`,
                    children: isObject( target.value[ key ] ) ? Object.keys( target.value[ key ] ) : [],
                    valueExpanded: false,
                    type: getTargetType( target.value[ key ] ),
                    value: target.value[ key ]
                };
            } );
        }

        setPresentation( _presentation );
    };

    return (
        <Card className={'view-tree-viewer'}>
            { renderValue( presentation, expandPresentation )}
            { renderCopyFormatedButton( parsedObject )}
        </Card>
    );
};

//////////////////////////////////////// HELPER FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const renderCopyFormatedButton = ( parsedObject ) => {
    return <Button
        label={'Print Formatted JSON in Console'}
        icon={CgCopy}
        onClick={ () => {
            const val = JSON.stringify( parsedObject, null, 4 ) ;
            console.log( val );
        }}
        className={'view-tree-viewer__copy'}
    />;
};

const getTargetType = ( target ) => {
    if( isString( target ) ) {return 'string';}
    if( isNumber( target ) ) {return 'number';}
    if( isBoolean( target ) ) {return 'bool';}
    if ( isNil( target ) ) {return 'nil';}
    if( isArray( target ) ) {return 'array';}
    return 'object';
};

const printTypeComponent = ( type ) => {
    return (
        <span className={'view-tree-viewer__subtree__value__type view-tree-viewer__subtree__value__type--' + type } >
            {type}
        </span>
    );
};

const renderValue = ( presentation, expandPresentation ) => {

    return (
        presentation &&
        <div className='view-tree-viewer__subtree'>
            {
                presentation.map( ( node ) => {
                    const canExpand = 0 !== node.children.length;

                    return (
                        <>
                        <div className='view-tree-viewer__subtree__value'>
                            {
                                node.valueExpanded && canExpand &&
                                <MdArrowDropDown onClick={ () => expandPresentation( node.position )} size={30} />
                            }

                            {
                                !node.valueExpanded && canExpand &&
                                <MdPlayArrow onClick={ () => expandPresentation( node.position )} />
                            }
                            {
                                canExpand ?
                                <span onClick={() => expandPresentation( node.position )}>
                                    <span>
                                        { node.name }
                                    </span>

                                    { printTypeComponent( node.type ) }

                                    <span className='view-tree-viewer__subtree__value__count'>
                                        { node.children.length }
                                    </span>
                                </span>
                                :
                                <span>
                                    {`${node.name} : ${JSON.stringify( node.value )}` }
                                    { printTypeComponent( node.type ) }
                                </span>
                            }
                        </div>
                        {
                            node.valueExpanded &&
                            renderValue( node.value, expandPresentation )
                        }

                        {
                            
                        }
                        </>
                    );
                } )
            }
        </div>
    );
};

//////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
