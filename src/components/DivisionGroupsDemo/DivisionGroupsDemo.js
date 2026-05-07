'use client';
import React from 'react';
import clsx from 'clsx';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';

import { range } from '@/utils';
import Card from '@/components/Card';
import SliderControl from '@/components/SliderControl';

import Equation from './Equation';
import styles from './DivisionGroupsDemo.module.css';

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const [numOfGroups, setNumOfGroups] = React.useState(
    initialNumOfGroups
  );

  const numOfItemsPerGroup = Math.floor(
    numOfItems / numOfGroups
  );

  const remainder = includeRemainderArea
    ? numOfItems % numOfGroups
    : null;
  const shouldReduceMotion = useReducedMotion();
  const groupedItemCount = numOfItemsPerGroup * numOfGroups;
  const groupItemIds = range(numOfGroups).map((groupIndex) => {
    const start = groupIndex * numOfItemsPerGroup;
    const end = start + numOfItemsPerGroup;

    return range(start, end);
  });
  const remainderItemIds = includeRemainderArea
    ? range(groupedItemCount, numOfItems).reverse()
    : [];
  const itemTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        type: 'spring',
        stiffness: 450,
        damping: 36,
      };

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
        };

  return (
    <Card as="section" className={styles.wrapper}>
      <header className={styles.header}>
        <SliderControl
          label="Number of Groups"
          className={styles.slider}
          step={1}
          min={1}
          max={4}
          value={numOfGroups}
          onChange={(ev) =>
            setNumOfGroups(Number(ev.target.value))
          }
        />
      </header>

      <LayoutGroup>
        <div className={styles.demoWrapper}>
          <div
            className={clsx(styles.demoArea)}
            style={gridStructure}
          >
            {groupItemIds.map((itemIds, groupIndex) => (
              <motion.div
                key={groupIndex}
                className={styles.group}
                layout={!shouldReduceMotion}
                transition={itemTransition}
              >
                {itemIds.map((itemId) => {
                  return (
                    <motion.div
                      key={itemId}
                      className={styles.item}
                      layout={!shouldReduceMotion}
                      layoutId={`division-item-${itemId}`}
                      transition={itemTransition}
                    />
                  );
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <motion.div
            className={styles.remainderArea}
            layout={!shouldReduceMotion}
            transition={itemTransition}
          >
            <p className={styles.remainderHeading}>
              Remainder Area
            </p>

            {remainderItemIds.map((itemId) => {
              return (
                <motion.div
                  key={itemId}
                  className={styles.item}
                  layout={!shouldReduceMotion}
                  layoutId={`division-item-${itemId}`}
                  transition={itemTransition}
                />
              );
            })}
          </motion.div>
        )}
      </LayoutGroup>

      <Equation
        dividend={numOfItems}
        divisor={numOfGroups}
        remainder={remainder}
      />
    </Card>
  );
}

export default DivisionGroupsDemo;
