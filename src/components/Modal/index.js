import React, { PureComponent, }from 'react';
import { render, createPortal, } from 'react-dom';
import clasname from 'classnames';
import Button from '../Button';
import './index.less';
export default class Modal extends PureComponent {

  state = {
    mvisible: true,
  };
  static renderElementMethod(options) {
    const container = document.createElement('div');
    const newmodal = render(
      <Modal
        visible
        {...options}
      />,container
    );
    newmodal._container = document.getElementById('beat-modal-mask');
  }
  static warning(options) {
    const { isStatic, } = this.props;
    if(isStatic) {
      return this.renderElementMethod(options);
    }

  }
  componentDidUpdate () {
    const { visible, } = this.props;
    if (visible === true) {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  }
  destroy = () => {
    // this._container.remove();
  };
  handOk =() => {
    this.props.onCancel();
  }
  handCancel =() => {
    const { isStatic, } = this.props;
    if(isStatic) {
      this.setState({
        mvisible: false,
      },()=> {
        this.destroy();
      });
    } else {
      this.props.onCancel();
    }
  }
  // 禁止滚动
  disableScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
  }
  // 解除滚动
  enableScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = 0;
  }
  render() {
    const {
      title, // modal 标题
      children,  // 子元素
      okText,  // 确认按钮文案
      cancelText, // 取消按钮文案

      content, // 静态方法内容
      isStatic, // 是否静态方法
    } = this.props;
    const  { mvisible, } = this.state;
    const visible = isStatic ? mvisible : this.props.visible;
    return createPortal(
      <div
        className={clasname({
          ['beat-modal-mask']: 'beat-modal-mask',
          [`beat-modal-mask-${visible}`]: `${visible}`,
        })}
        id="beat-modal-mask"
      >
        <div
          className={clasname({
            ['beat-modal-warp']: 'beat-modal-warp',
          })}
          role="dialog"
          tabIndex="-1"
        >
          <div
            className={clasname({
              ['beat-modal']: 'beat-modal',
            })}
          >
            <div
              className={clasname({
                ['beat-modal-content']: 'beat-modal-content',
              })}
            >
              {
                isStatic
                  ? <div>
                    <div className={'beat-modal-body'}>
                      <span className={'beat-modal-confirm-title'}>{title}</span>
                      {content}
                      <div className={'beat-modal-confirm-btns'}>
                        <Button onClick={this.handCancel}
                          type="primary"
                        >知道了</Button>
                      </div>
                    </div>
                  </div>
                  : <div>
                    <div className={'beat-modal-header'}>
                      <div className={'beat-modal-title'}>{title}</div>
                    </div>
                    <div className={'beat-modal-body'}>
                      {children}
                    </div>
                    <div className={'beat-modal-footer'}>
                      <Button onClick={this.handCancel}>
                        {cancelText}
                      </Button>
                      <Button onClick={this.handOk}
                        type="primary"
                      >
                        {okText}
                      </Button>
                    </div>
                  </div>
              }


            </div>
          </div>
        </div>
      </div>,
      document.getElementById('root')
    );
  }
}

Modal.defaultProps = {
  okText: '确认',
  cancelText: '取消',
  title: 'Basic Modal',
  visible: false,
  onOk: () => {},
  onCancel: () => {},
  isStatic: false,
};
