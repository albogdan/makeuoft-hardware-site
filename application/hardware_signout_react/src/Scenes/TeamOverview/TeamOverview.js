import React, { PureComponent } from 'react'
import styles from './teamOverview.module.scss';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default class teamOverview extends PureComponent {
 

  render() {
   
    return (
      <div className={styles.overview}>
        <h2>Team Overview</h2>

        
        <div className={styles.overviewTeam}>
          <span style={{fontWeight: 600}}>Team 1: &nbsp;</span>
          <span>Lisa, </span>
          <span>Lisa, </span>
          <span>Lisa, </span>
          <span>Lisa, </span>
        </div>


        <Accordion className={styles['accordion']} allowZeroExpanded={true} allowMultipleExpanded={true} preExpanded={["checkout"]}>
          <AccordionItem className={styles['accordion__item']} uuid={"checkout"}>
              <AccordionItemHeading>
                  <AccordionItemButton className={styles['accordion__button']}>
                      Checked Out
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles['accordion__panel']}>
                  <p>
                      Exercitation in fugiat est ut ad ea cupidatat ut in
                      cupidatat occaecat ut occaecat consequat est minim minim
                      esse tempor laborum consequat esse adipisicing eu
                      reprehenderit enim.
                  </p>
              </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem className={styles['accordion__item']}>
              <AccordionItemHeading>
                  <AccordionItemButton className={styles['accordion__button']}>
                      Returned
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles['accordion__panel']}>
                  <p>
                      In ad velit in ex nostrud dolore cupidatat consectetur
                      ea in ut nostrud velit in irure cillum tempor laboris
                      sed adipisicing eu esse duis nulla non.
                  </p>
              </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
  </div>
    )
  }
}
