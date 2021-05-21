import React from 'react';
import { Grid, Row, Col } from '../../Components/Molicules/UIComponents/UIComponents';

export type Page404Props = {

}

export const Page404: React.FC<Page404Props> = () => {
    return (
        <Grid>
            <Row container>
                <Col size={1}>
                    <p>TEST</p>
                </Col>
            </Row>
            <Row container>
                <Col item size={2}>
                    <p>TEST</p>
                </Col>
                <Col item size={1}>
                    <p>TEST</p>
                </Col>
            </Row>
        </Grid>
    )
}