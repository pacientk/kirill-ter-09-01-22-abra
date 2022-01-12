import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { currentCityDataSelector, isLoadingSelector, isInitialSelector, initStateSelector, currentDaylyForecastSelector } from '../../store/selectors';
import Spinner from '../../components/Spinner/Spinner';
import { Button, Container, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { fetchCityData } from '../../store/weatherAPI';
import { getWeekDay } from '../../utils/utils';
import { SearchInput } from '../../components';

const DEFAULT_CITY = 'Ashdod';

const Home = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingSelector);
    const isInitial = useAppSelector(isInitialSelector);
    const currentCityData = useAppSelector(currentCityDataSelector);
    const currentDaylyForecast = useAppSelector(currentDaylyForecastSelector);

    useEffect(() => {
        dispatch(fetchCityData(DEFAULT_CITY));
    }, []);

    const forecastItem = () => {
        return (
            currentDaylyForecast.map((item: any, i: number) => {
                const { Maximum, Minimum } = item.Temperature;
                const weatherType = item.Day.IconPhrase;
                const date = item.Date;
                const weekDay = getWeekDay(date);

                return (
                    <Col key={i} className="mt-5 mb-5">
                        <p className="text-center fw-lighter fs-3 lh-1">{weekDay}</p>
                        <p className="text-center fw-lighter fs-5 lh-1">{weatherType}</p>
                        <p className="text-center fw-lighter fs-2 lh-1">{Maximum.Value}º / {Minimum.Value}º</p>
                    </Col>
                );
            })
        );
    };

    // STATE
    console.log('@@@@ STATE', useAppSelector(initStateSelector));

    return (
        <Container>
            {isLoading && !isInitial && <Spinner />}

            <Row>
                <Col md={{ span: 10, offset: 1 }} style={{ paddingTop: '2rem' }}>

                    <SearchInput/>
                    {/*<InputGroup className="mb-3 mt-3" size="lg">*/}
                    {/*    <FormControl*/}
                    {/*        placeholder="Search for Location"*/}
                    {/*        aria-label="Search for Location"*/}
                    {/*        aria-describedby="city-search"*/}
                    {/*    />*/}
                    {/*    <Button variant="outline-secondary" id="city-search">*/}
                    {/*        Search*/}
                    {/*    </Button>*/}
                    {/*</InputGroup>*/}
                </Col>
            </Row>
            {isInitial &&
            <>
                <Row>
                    <Col md={{ span: 10, offset: 1 }} className="border-bottom mt-5">
                        <div className="mb-5">
                            <p className="text-center fw-lighter display-5 lh-1">{currentCityData.name}</p>
                            <p className="text-center fw-lighter fs-5 lh-1">{currentCityData.weather.weatherType}</p>
                            <p className="text-center fw-lighter display-1 lh-1">{currentCityData.weather.value}º</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {forecastItem()}
                </Row>
            </>
            }
        </Container>
    );
};

export default Home;
