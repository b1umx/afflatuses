import React from 'react';
import classNames from 'classnames';

import SidebarMenu from '../../src/SidebarMenu';


const menuItems = [
  {
    key: 'main',
    icon: 'fas fa-home',
    label: 'Главная панель',
    link: '/'
  },
  {
    key: 'files',
    icon: 'fas fa-bug',
    label: 'Файлы',
    link: '/files'
  },
  {
    key: 'tags',
    icon: 'fas fa-tags',
    label: 'Теги',
    link: '/tags'
  },
  {
    key: 'themes',
    icon: 'fas fa-pen',
    label: 'Оформление',
    link: '/themes',
    disabled: true,
    subItems: [
      { key: 'light', label: 'Светлая', link: '/themes/light' },
      { key: 'dark', label: 'Темная', link: '/themes/dark' }
    ]
  },
  {
    key: 'langs',
    icon: 'fas fa-language',
    label: 'Языки',
    link: '/langs',
    disabled: true,
    subItems: [
      { key: 'ru', label: 'Русский', link: '/langs/ru' },
      { key: 'en', label: 'Английский', link: '/langs/en' },
      { key: 'ch', label: 'Китайский', link: '/langs/ch' }
    ]
  },
  {
    key: 'uploads',
    icon: 'fas fa-cloud-upload-alt',
    label: 'Загрузки',
    link: '/uploads'
  },
];


class NavigateLayout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      shiftedLeft: false
    };

    this.toggleLeftPanel = this.toggleLeftPanel.bind(this);
  }

  toggleLeftPanel() {
    this.setState(() => ({
      shiftedLeft: !this.state.shiftedLeft
    }))
  }

  render() {
    return (
      <div className={classNames('board-wrapper', 
          { 'shifted-left': this.state.shiftedLeft })}>
        <div className="logo">
          <span>Логотип</span>
        </div>
        <div className="main-toolbar">
          <div className="toolbar-group-left">
            <div className="toggle-left-panel-btn" onClick={this.toggleLeftPanel}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
        <SidebarMenu collapsed={this.state.shiftedLeft} title='Навигация' items={menuItems} key="sidebar" />
        <div className="main-panel">
          <div>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut libero magna. Mauris sit amet risus posuere lectus dictum finibus eleifend eget metus. Aliquam elit tortor, laoreet quis leo nec, porttitor sodales ligula. Maecenas tempus nulla nec fringilla pellentesque. In aliquam sit amet ipsum in maximus. Ut lobortis dui in commodo vehicula. Pellentesque eu malesuada risus, iaculis tempus lorem. Sed odio felis, tempor et fringilla ac, finibus fringilla felis. Praesent bibendum eros et cursus tempor. Nam rhoncus vestibulum diam quis iaculis. Proin nec consequat purus. Aenean ullamcorper vehicula massa, ac scelerisque augue finibus eget. Quisque a feugiat ipsum. Fusce condimentum est urna, quis vehicula erat tincidunt sed. Aenean in sem quis neque eleifend suscipit. Nulla volutpat sem a ullamcorper porttitor.
Ut viverra imperdiet imperdiet. Quisque vitae dapibus sapien. Aliquam congue accumsan ex, vitae lobortis turpis sagittis in. Ut nec ligula ac risus vestibulum porta. In iaculis enim libero, non ultricies augue pretium a. Mauris accumsan eget sapien a elementum. Morbi eu massa eget diam suscipit consequat. Quisque interdum dui vitae magna ultrices, at tristique felis placerat. Aliquam erat volutpat. Maecenas ligula lacus, mollis rhoncus odio sit amet, consectetur scelerisque elit.
Suspendisse semper, purus a lacinia cursus, neque dolor vehicula orci, id porta massa eros quis augue. Quisque lobortis quam a nisi sagittis, ut maximus nisi imperdiet. Ut quam tortor, aliquam a varius ac, elementum eget justo. Quisque posuere venenatis ipsum, id consectetur magna tempus sed. In ut ligula pellentesque, placerat massa pulvinar, vestibulum odio. Cras mollis dui a lobortis malesuada. Fusce ante elit, vulputate eu tincidunt vitae, eleifend in ligula. Phasellus sit amet venenatis elit, vel rutrum ligula. Aliquam sapien lacus, laoreet quis pellentesque sed, porttitor quis odio. Aenean rutrum quam diam, id gravida dui mollis posuere. Sed scelerisque vel lacus dapibus finibus. Nulla enim lacus, dapibus eget neque nec, pretium faucibus nibh. Pellentesque pulvinar turpis vitae erat lobortis, quis tempus augue elementum. Nullam neque eros, pharetra eu mattis at, elementum quis ligula.
Fusce tempus blandit aliquam. Aenean elementum sit amet ligula nec viverra. Phasellus at sollicitudin quam, eu ultricies tortor. Vestibulum dictum ut arcu sed sodales. Curabitur non placerat nunc. Proin eget eros a metus bibendum faucibus. Morbi et felis vitae sem dignissim interdum sit amet sed magna. Duis fringilla velit in mi molestie volutpat. Mauris magna urna, mollis et lectus sed, dictum fermentum quam. Sed vulputate maximus nisi, a porttitor dolor scelerisque at. Sed elit ante, ultricies eget lacus at, efficitur interdum ex. Donec euismod finibus magna in rhoncus. Ut eu ligula vitae eros accumsan blandit vitae sed urna. Quisque finibus tristique purus ac semper. Fusce interdum nibh dui, ut gravida sapien pulvinar sit amet. Quisque pulvinar turpis massa, ut volutpat nulla tincidunt id.
Aenean iaculis iaculis fringilla. Mauris at luctus enim. Maecenas laoreet malesuada arcu, sit amet hendrerit ante vulputate in. Duis consequat lacus et dolor dignissim euismod. Nulla sit amet tincidunt libero. Pellentesque interdum blandit diam, eget accumsan libero convallis ut. Quisque in ullamcorper risus. Duis vitae eros at turpis lobortis aliquet. Cras ac viverra est. Phasellus lacinia ut sapien ut consequat. In eget magna ex. Vivamus tincidunt, nulla id malesuada faucibus, est ligula tincidunt risus, non tristique nibh erat sit amet velit. Sed sed nunc eget dolor efficitur iaculis.
Sed purus eros, posuere at justo nec, cursus aliquam felis. Fusce nec purus commodo, consectetur enim vitae, condimentum justo. Nullam tempor arcu nisl, ac efficitur nulla posuere quis. Suspendisse potenti. Aliquam malesuada mi in blandit posuere. Pellentesque lacinia nunc ipsum. Praesent sed massa laoreet, varius quam id, maximus justo. Etiam mattis, justo sit amet ornare mollis, nulla diam vulputate magna, in volutpat ipsum libero sed quam. Maecenas ut nibh id augue feugiat ultricies. Aenean eget enim ut libero consectetur condimentum. Cras commodo erat lacus, non rutrum est cursus dictum. Phasellus iaculis efficitur purus non bibendum. Suspendisse potenti. Donec non ornare dui.
Ut lorem orci, aliquam nec mollis nec, commodo ut lacus. Suspendisse imperdiet, magna id tincidunt semper, ipsum erat tincidunt nulla, eget bibendum ante orci ut augue. Aliquam ut magna blandit, blandit nisi sed, hendrerit lacus. Nunc orci ipsum, consequat eu molestie in, tempor vitae arcu. Sed tellus tellus, fermentum ut mauris eu, lacinia condimentum dolor. Aenean sed tincidunt est. Integer scelerisque lobortis libero vel tincidunt. Fusce congue vehicula euismod. Aenean volutpat venenatis neque. Nullam sed nulla eget ipsum euismod cursus.
Sed elementum luctus nisi id eleifend. Morbi sodales dolor eleifend nibh posuere venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam at diam in metus vulputate lacinia vel non felis. Nulla porta odio eget fringilla condimentum. Ut nulla ligula, maximus vel venenatis quis, fermentum faucibus nisl. Pellentesque fermentum tincidunt sollicitudin. 
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }

}

export default NavigateLayout;
