import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuItem from './MenuItem';

/**
 * Компонент отображает левую фиксированную боковую панель с меню. Боковая 
 * панель может быть частично скрыта (урезана) с помощью параметра. При 
 * наведении курсора на урезанную панель, она распахивается до прежнего уровня.
 */
class SidebarMenu extends React.Component {

  static propTypes = {
    /**
     * Флаг указывает на состояние, когда меню урезано.
     */
    collapsed: PropTypes.bool,
    /**
     * Необязательный заголовок меню.
     */
    title: PropTypes.string,
    /**
     * Массив пунктов меню.
     */
    items: PropTypes.array
  };

  static defaultTypes = {
    collapsed: false,
    items: []
  }

  constructor(props) {
    super(props);

    this.state = {
      /**
       * Текущий распахнутый пункт меню с подменю
       */
      expandedItem: '',
      /**
       * Флаг указывает на состояние, когда боковая панель находится в фокусе
       * (курсор мышки над панелью)
       */
      focused: false
    }

    this.expandItem = this.expandItem.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
   * Устанавливает в состояние название пункта меню, которой сейчас будет 
   * раскрыт (или очищает состояние, если название этого пункта уже стоит в
   * состоянии раскрытого).
   * @param label название раскрываемого (закрываемого) пункта меню 
   */
  expandItem(label) {
    this.setState((state) => {
      let newExpItem = state.expandedItem === label ? '' : label;
      return { expandedItem: newExpItem }; 
    })
  }

  /**
   * Предназначен для перехвата события, когда укзатель мыши входит в область
   * над боковой панелью. Если в данный момент меню урезано, то оно входит в
   * состояние фокуса.
   */
  handleMouseEnter() {
    if (this.props.collapsed) {
      this.setState(() => ({
        focused: true
      }))
    }
  }

  /**
   * Предназначен для перехвата события, когда укзатель мыши выходит из области
   * над боковой панелью. Если в данный момент меню урезано, то оно выходит из
   * состояния фокуса.
   */
  handleMouseLeave() {
    if (this.props.collapsed) {
      this.setState(() => ({
        focused: false
      }))
    }
  }

  render() {
    return (
      <div className={classNames('sidebar', { collapsed: this.props.collapsed 
            && !this.state.focused })} onMouseEnter={this.handleMouseEnter} 
          onMouseLeave={this.handleMouseLeave}>

        <label className="menu-title">{this.props.title}</label>
        <nav className="menu">
          {this.props.items.map(item => (
            <MenuItem expandedItem={this.state.expandedItem} 
              handleToggleItem={this.expandItem} 
              collapsed={this.props.collapsed}
              focused={this.state.focused} {...item} />
          ))}
        </nav>

      </div>
    );
  }

}

export default SidebarMenu;
