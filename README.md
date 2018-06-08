# react-redux-typed-connect

Inspired by https://github.com/epeli/redux-render-prop , yet another attempt
to provide typesafe access to Redux state and action creators in React
components.

Usage

```ts
import {PropsOf, typedConnect} from 'react-redux-typed-connect';
import {createStandardAction} from 'typesafe-actions';

interface State {
  counters: {
    [name: string]: {count: number};
  };
}

const actions = {
  incrementByName: createStandardAction('INC')<string>
};

type OwnProps = {name:string};

const propsMapper = {
  fromState: (state: State, ownProps: OwnProps) => ({
    count: state.counters[ownProps.name].count
  }),
  actions: (ownProps: OwnProps) => ({
    inc() {  
      return actions.incrementByName(ownProps.name);
    }
  })
};

const Counter = ({inc, count}:PropsOf<typeof propsMapper>) => (
  <button onClick={inc}>
    {count}
  </button>
);

export default typedConnect(propsMapper)(Counter);
```
