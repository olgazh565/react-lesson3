import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: 'Результат',
    userNumber: '',
    randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min)) +
      this.props.min,
    count: 0,
    isOver: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        попыток ${state.count}`,
        isOver: true,
      };
    }, () => {
      this.setState({
        userNumber: '',
      });
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  handleResetGame = () => {
    this.setState({
      result: 'Результат',
      userNumber: '',
      randomNumber:
      Math.floor((Math.random() * this.props.max - this.props.min)) +
        this.props.min,
      count: 0,
      isOver: false,
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
          />

          <button className={style.btn}>Угадать</button>
        </form>
        {this.state.isOver && (
          <button
            className={style.btn}
            type='button'
            onClick={this.handleResetGame}>
            Сыграть еще
          </button>
        )}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
