import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const IMAGE_PATH = "/assets/icons/";

const links = [
    {
        title: 'common:home',
        icon: 'home.svg',
        to: '/',
        items:[]
    },
    {
        title: 'common:transforms',
        icon: 'exchange.svg',
        to:null,
        items:[
            {
                title:'common:send_transform',
                to:'transform/send'
            },
            {
                title:'common:recieve_transform',
                to:'transform/receive'
            }
        ]
    },
    {
        title: 'common:reports',
        icon: 'report.svg',
        to:null,
        items:[
            {
                title:'common:report_user',
                to:'report/user'
            },
            {
                title:'common:report_daily',
                to:'report/daily'
            }
        ]
    },
];

export const NavList = () => {
    const [activeItem, setActiveItem] = useState(null);
    const { t: trans } = useTranslation(["common"]);
    return (
        <div className='clayout-user-sidebar-content'>
            <ul className='list-none p-3'>
                {
                    links.map((item, index) => {
                        return <NavItem
                            key={`parent-${index}`}
                            image={(IMAGE_PATH + item?.icon)}
                            parentTitle={trans(item?.title)}
                            to={item?.to}
                            id={index}
                            items={item?.items}
                            activeId={activeItem}
                            onClick={(value) => {
                                setActiveItem(value);
                            }}
                        />
                    })
                }
            </ul>

        </div>);
};

const ACTIONS = {
    ROTATE_ACTION: 'rotate',
    RESET_ACTION: 'reset'
};


export const NavItem = ({
    activeId,
    image,
    to,
    parentTitle = '',
    items = [],
    id,
    onClick,
}) => {
    const { t: trans } = useTranslation(["common"]);
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.ROTATE_ACTION:
                const _rotate = state?.rotate >= 180 ? 0 : 180;
                const _bold = !state?.bold;
                return { bold: _bold, rotate: _rotate, active: !state.active };
                break;
            case ACTIONS.RESET_ACTION:
                return { bold: false, rotate: 0, action: false };
            default:
                return state;
        }
    };
    const [itemState, dispatch] = useReducer(reducer, { bold: false, rotate: 0 ,active : false});
    const [activeItem, setActiveItem] = useState(null);
    useEffect(() => {
        if (activeId !== id) {
            dispatch({ type: ACTIONS.RESET_ACTION });
            setActiveItem(null);
        }
    }, [activeId])
    const activeStyle = {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderRadius: '10rem'
    };

    return (<li className='clayout-user-sidebar-parent'>
        <NavLink
            to={to ? to : window.location.pathname}
            end
            className='flex flex-row items-center justify-between core-gap-2'
            onClick={() => {
                if (onClick) {
                    dispatch({type:ACTIONS.ROTATE_ACTION});
                    onClick(id);
                }
            }
           }
        >
            <div className='flex flex-row items-center core-gap-2'>
                <img src={image} alt={parentTitle} />
                <h3 className={`ctext-font-2 ctext-white ${itemState?.bold ? 'font-bold' : ''}`}>{parentTitle}</h3>
            </div>
            {(items?.length > 0) && <img style={{ transform: `rotate(${itemState?.rotate}deg)` }} src='/assets/icons/cart-down.svg' alt='cart' className='clayout-user-sidebar-parent-img' />}
        </NavLink>
        {
         ((itemState.active) && (items && <ul className='clayout-user-sidebar-child'>
                {
                    items.map((child, index) => {
                        return (
                            <li>
                                <NavLink
                                    end
                                    style={() => activeItem == index ? activeStyle : undefined}
                                    onClick={() => {
                                        setActiveItem(index);
                                    }
                                   }
                                    key={index}
                                    className='clayout-user-sidebar-child-item flex flex-row items-center core-gap-2'
                                    to={child?.to}>
                                    <h3 className='ctext-font-1 ctext-white'>{trans(child?.title)}</h3>
                                </NavLink>
                            </li>
                        );
                    })
                }
            </ul>))
        }
    </li>);
};