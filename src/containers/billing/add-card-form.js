import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import * as billingActions from 'redux/modules/billing';
import AddCardPanel from 'components/billing/add-card-panel';

@reduxForm({
  form: 'CreditCard',
  fields: [
    'firstName',
    'lastName',
    'telephone',
    'streetAddress',
    'city',
    'state',
    'zip',
    'country',
    'ccNumber',
    'ccExp',
    'cvv',
    'ccName'
  ]
})

@connect(
  (state) => {
    return {
      billing: state.billing
    };
  },
  (dispatch) => {
    return {
      addCard: (cardData) => dispatch(billingActions.addCard(cardData))
    };
  }
)

export default class AddCardForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired
  };

  handleCardSubmit() {
    const {
      fields,
      addCard
    } = this.props;

    const cardData = Object.keys(fields).reduce((result, fieldName) => {
      result[fieldName] = fields[fieldName].value;
      return result;
    }, {});

    addCard(cardData);
  }

  render() {
    const {
      fields,
    } = this.props;

    return (
      <AddCardPanel fields={fields} handleCardSubmit={this.handleCardSubmit}/>
    );
  }
}
