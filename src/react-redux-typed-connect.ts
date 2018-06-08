import {
  connect,
  InferableComponentEnhancerWithProps
} from 'react-redux';
import {
  bindActionCreators, 
  ActionCreatorsMapObject,
  Dispatch,
  AnyAction
} from 'redux';

export interface PropsMapper<StateProps, DispatchProps, OwnProps, RootState> {
  fromState: (state:RootState, ownProps:OwnProps) => StateProps;
  actions: (ownProps:OwnProps) => DispatchProps;
}

export type PropsOf<T> = T extends PropsMapper<infer StateProps, infer DispatchProps, infer OwnProps, infer RootState>
  ? StateProps & DispatchProps & OwnProps
  : never;

export function typedConnect<
  StateProps,
  DispatchProps extends ActionCreatorsMapObject,
  OwnProps,
  RootState>(mapper:PropsMapper<StateProps, DispatchProps, OwnProps, RootState>):InferableComponentEnhancerWithProps<StateProps & DispatchProps, OwnProps> {
  return connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapper.fromState,
    (dispatch:Dispatch<AnyAction>, ownProps:OwnProps) => bindActionCreators(mapper.actions(ownProps), dispatch)
  );
}
