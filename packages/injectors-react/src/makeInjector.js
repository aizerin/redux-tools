import React, { Component } from 'react';
import { omit } from 'ramda';
import PropTypes from 'prop-types';
import { getDisplayName } from '@redux-tools/utils';

import withInjectorContext from './withInjectorContext';

let counter = 0;
makeInjector.resetCounter = () => (counter = 0);

export default function makeInjector(inject, eject) {
	return (injectables, { persist, global } = {}) => NextComponent => {
		class Injector extends Component {
			static propTypes = {
				namespace: PropTypes.string,
				store: PropTypes.object.isRequired,
			};

			static displayName = `Injector(${getDisplayName(NextComponent)})`;

			constructor(props) {
				super(props);

				this.namespace = global ? null : props.namespace;
				this.version = counter++;

				inject(props.store)(injectables, this.namespace, this.version);
			}

			componentWillUnmount() {
				if (!persist) {
					eject(this.props.store)(injectables, this.namespace, this.version);
				}
			}

			render() {
				return <NextComponent {...omit(['store'], this.props)} />;
			}
		}

		return withInjectorContext(Injector);
	};
}
