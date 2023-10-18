/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { LogBox } from 'react-native';
import {name as appName} from './app.json';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
