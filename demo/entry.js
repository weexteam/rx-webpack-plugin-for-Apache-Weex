/* @jsx createElement */

import {createElement} from 'rx';
import Hello from './Hello';
import {mount} from 'rx-mounter';

mount(<Hello />, 'body');
