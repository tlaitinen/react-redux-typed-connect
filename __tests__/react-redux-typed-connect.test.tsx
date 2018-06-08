import React from "react";
import {render, Simulate} from "react-testing-library";
import {PropsOf, typedConnect} from "../src/react-redux-typed-connect";
import {createStore} from "redux";
import {Provider} from "react-redux";

type State = {
	counters: {
		[name: string]: {count: number};
	};
};
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
	<button data-testid='test' onClick={inc}>
		{count}
	</button>
)

const ConnectedCounter = typedConnect(propsMapper)(Counter); 

test("can render data to react", () => {

    const initialState = {
      counters: {
        test:0
      }
    };
    const store = createStore(s => s, initialState);
    const App = () => (
        <Provider store={store}>
          <div>
            <ConnectedCounter name='test'/>o
          </div>
        </Provider>
    );

    const rtl = render(<App />);

    const el = rtl.getByTestId('test');
  console.log(el);

    expect(el.innerHTML).toBe('0');
});
