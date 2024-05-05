import React from 'react';
import Item from '../Item/Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const NewCollections = (props) => {
  return (
    <section className='bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Discover Our New Collections</h2>
        <hr className='mx-auto w-1/3 border-0 bg-gradient-to-r from-transparent via-black to-transparent h-1 mb-16' />
        <TransitionGroup className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {props.data.map((item, i) => (
            <CSSTransition key={i} timeout={500} classNames="item">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </section>
  );
}

export default NewCollections;
