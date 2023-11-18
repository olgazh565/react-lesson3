import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Введите число от 0 до 10',
    userNumber: '',
    randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min)) +
      this.props.min,
    count: 0,
    isOver: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.isOver) {
      this.setState(state => {
        if (!state.userNumber || state.userNumber > 10 ||
          state.userNumber < 0) {
          return {
            result: 'Введите число от 0 до 10',
          };
        }

        if (state.userNumber > state.randomNumber) {
          return {
            count: state.count + 1,
            result: `${state.userNumber} больше загаданного`,
          };
        }

        if (state.userNumber < state.randomNumber) {
          return {
            count: state.count + 1,
            result: `${state.userNumber} меньше загаданного`,
          };
        }

        return {
          count: state.count + 1,
          isOver: true,
        };
      }, () => {
        this.setState(state => {
          if (state.isOver) {
            return {
              result: `Вы угадали, загаданное число ${state.userNumber},
              попыток ${state.count}`,
              userNumber: '',
            };
          }
          return {
            userNumber: '',
          };
        });
      });
    }

    if (this.state.isOver) {
      this.setState({
        result: 'Введите число от 0 до 10',
        userNumber: '',
        randomNumber:
          Math.floor((Math.random() * this.props.max - this.props.min)) +
          this.props.min,
        count: 0,
        isOver: false,
      });
    }
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number' id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            autoFocus
            disabled={this.state.isOver}
          />

          <button className={style.btn}>
            {this.state.isOver ? 'Сыграть еще' : 'Угадать'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
