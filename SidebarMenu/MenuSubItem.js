import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';


/**
 * Пункт меню второго уровня. Отображает название и
 * оборачивает его ссылкой из react-router. 
 * @param props Входные параметры
 */
const MenuSubItem = props => {
  const { label, link } = props;

  return <li className="menu-sub-item">
    <NavLink exact activeClassName="active" to={link}>{label}</NavLink>
  </li>
};

MenuSubItem.propTypes = {
  /**
   * Название пункта меню
   */
  label: PropTypes.string.isRequired,
  /**
   * Ссылка на целевой путь (Route) для react-router
   */
  link: PropTypes.string.isRequired
};

export default MenuSubItem;
