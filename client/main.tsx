import React from 'react';
import { Meteor } from 'meteor/meteor';
import {render} from 'react-dom';
import App from '/imports/ui/App'
import '/imports/api/GridMap/methods';

Meteor.startup(() => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
    , document.getElementById('react-target'));
});
