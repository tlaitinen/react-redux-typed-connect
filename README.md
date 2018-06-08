# react-redux-typed-connect

Inspired by https://github.com/epeli/redux-render-prop , yet another attempt
to provide typesafe access to Redux state and action creators in React
components.

Usage

```ts
import {
  createPropsMapper,
  typedConnect, 
  PropsOf
} from 'react-redux-typed-connect';
import {createStandardAction} from 'typesafe-actions';

interface State {
  counters: {
    [name: string]: {count: number};
  };
}

const actions = {
  incrementByName: createStandardAction('INC')<string>
};

const propsMapper = createPropsMapper({
  fromState: (state: State, ownProps: {name:string}) => ({
    count: state.counters[ownProps.name].count
  }),
  actions: (ownProps) => ({
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
