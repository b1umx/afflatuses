import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Icon, Transition } from 'semantic-ui-react';

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

  render() {
    return (this.props.subItems && this.props.subItems.length > 0) ? (
      /* Если есть подменю */
      <div className="menu-item-container">
        <NavLink className={classNames('menu-item', 
            { 'expanded': this.props.subItems.length > 0 
              && this.props.label === this.props.expandedItem 
              && (!this.props.collapsed || this.props.focused) })} 
            onClick={this.handleClick} to={this.props.link}>
          
          <Icon className="menu-item-icon" name={this.props.icon} />
          <span className={classNames('menu-item-label', 
              { hide: this.props.hide })}>
            {this.props.label}
          </span>
          <Icon className={classNames('menu-item-arrow', 
              { hide: this.props.hide })} name="angle down" />
        
        </NavLink>
        
        {/* Подменю. Оборачиваем в Transition.Group для реализации анимации */} 
        <Transition.Group animation="fade down" duration="200">
          {/* Подменю показывается только, если родительский пункт меню
              раскрыт и само меню распахнуто */}
          {this.props.subItems.length > 0 
            && this.props.label === this.props.expandedItem 
            && (!this.props.collapsed || this.props.focused) &&
            <ul className="sub-menu">
              {this.props.subItems.map(subItem => <MenuSubItem {...subItem} />)}
            </ul>}
        </Transition.Group>
      </div>
    ) : (
      /* Если нет подменю */
      <div className="menu-item-container">
        <NavLink exact className="menu-item" activeClassName="active" 
            to={this.props.link}>

          <Icon className="menu-item-icon" name={this.props.icon} />
          <span className={classNames('menu-item-label', 
              { hide: this.props.hide })}>{this.props.label}</span>

        </NavLink>
      </div>
    );
  }
}

export default MenuItem;
