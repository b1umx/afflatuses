import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import AnimateHeight from 'react-animate-height';

import MenuSubItem from './MenuSubItem';


/**
 * Пункт меню первого уровня. Отображает обязательную иконку, название пункта и,
 * если имеется, меню второго уровня. Может урезаться до области одной иконки, 
 * скрывая остальные элементы.
 */
class MenuItem extends React.Component {

  static propTypes = {
    /**
     * Флаг: если true, то меню урезается по ширине.
     */
    collapsed: PropTypes.bool,
    /**
     * Флаг: если true, то меню возвращается в распахнутое состояние. 
     * Предназначен для действия в течение короткого времени, например, при
     * MouseEnter событии. Имеет эффект только если collapsed === true.
     */
    focused: PropTypes.bool,
    /**
     * Значение пункта меню, которое в текущий момент раскрыто (имеет эффект
     * только для меню, которое имеет подменю).
     */
    expandedItem: PropTypes.string.isRequired,
    /**
     * Callback-функция, которая вызывается при раскрытии пункта меню с подменю.
     */
    handleToggleItem: PropTypes.func.isRequired,
    /**
     * Флаг показывает, отключен ли пункт меню. Если true, то отключается 
     * переход по ссылке React Router.
     */
    disabled: PropTypes.bool,
    /**
     * Имя иконки. Поддерживается только Font Awesome из состава Semantic UI.
     */
    icon: PropTypes.string.isRequired,
    /**
     * Название меню
     */
    label: PropTypes.string.isRequired,
    /**
     * Ссылка на путь React Router.
     */
    link: PropTypes.string.isRequired,
    /**
     * Массив с элементами подменю.
     */
    subItems: PropTypes.array
  }

  static defaultProps = {
    collapsed: false,
    focused: false,
    disabled: false,
    subItems: []
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.shouldExpandSubMenu = this.shouldExpandSubMenu.bind(this);
  }

  /**
   * Предназначен для перехвата события нажатия на пункт меню. Если пункт меню
   * отключен, то предотвращает переход по ссылке React Router. Вызывает 
   * callback-функцию handleToggleItem.
   * @param event объект события.
   */
  handleClick(event) {
    if (this.props.disabled) {
      event.preventDefault();
    }

    this.props.handleToggleItem(this.props.label);
  }

  shouldExpandSubMenu() {
    return this.props.subItems.length > 0 
      && this.props.label === this.props.expandedItem 
      && (!this.props.collapsed || this.props.focused)
  }

  render() {
    return (this.props.subItems && this.props.subItems.length > 0) ? (
      /* Если есть подменю */
      <div className="menu-item-container">
        <NavLink className={classNames('menu-item', 
            { 'expanded': this.shouldExpandSubMenu() })} 
            onClick={this.handleClick} to={this.props.link}>
          
          <i className={classNames("menu-item-icon", this.props.icon)} ></i>
          <span className={classNames('menu-item-label', 
              { hide: this.props.hide })}>
            {this.props.label}
          </span>
          <i className="menu-item-arrow fas fa-angle-down"></i>
        
        </NavLink>
        
        {/* Подменю. Оборачиваем в AnimateHeight для реализации анимации */} 
        <AnimateHeight duration={300} 
            height={ this.shouldExpandSubMenu() ? 'auto' : 0 }>
          {/* Подменю показывается только, если родительский пункт меню
              раскрыт и само меню распахнуто */}
          <ul className="sub-menu">
            {this.props.subItems.map(subItem => <MenuSubItem {...subItem} />)}
          </ul>
        </AnimateHeight>
      </div>
    ) : (
      /* Если нет подменю */
      <div className="menu-item-container">
        <NavLink exact className="menu-item" activeClassName="active" 
            to={this.props.link}>

          <i className={classNames("menu-item-icon", this.props.icon)} ></i>
          <span className={classNames('menu-item-label', 
              { hide: this.props.hide })}>{this.props.label}</span>

        </NavLink>
      </div>
    );
  }
}

export default MenuItem;
