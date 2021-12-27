import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/styles.scss';
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './pages/HomePage';
import { StatisticPage } from './pages/StatisticPage';
import { ContactPage } from './pages/ContactPage';
import { ContactDetails } from './pages/ContactDetails';
import { ContactEdit } from './pages/ContactEdit';

export function App() {
    return (
        <Router>
            <div className="App">
                <AppHeader />
                <main>
                    <Switch>
                        <Route component={ContactEdit} path="/contact/edit/:id?" />
                        <Route component={ContactDetails} path="/contact/:id" />
                        <Route component={ContactPage} path="/contact"></Route>
                        <Route
                            component={StatisticPage}
                            path="/statistic"
                        ></Route>
                        <Route component={HomePage} path="/"></Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}
