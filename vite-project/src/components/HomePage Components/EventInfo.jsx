const EventInfo = ({ event }) => {
  console.log(event.organiser);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="md:mt-44 mt-12 py-2 flex items-center justify-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <h1 className="text-2xl">{`Welcome To the ${event?.organiser?.clubName} Club`}</h1>
        </div>
        <div className="px-12">
          <h1 className="text-center text-3xl text-teal-400 py-4">
            {event?.name}
          </h1>
          <p>
            {event?.description}
            Sapiente nemo repudiandae facere libero voluptatem, assumenda nulla
            modi asperiores, possimus quae totam laborum. Quis animi
            voluptatibus error, ipsa temporibus ducimus omnis, fuga autem sunt
            unde eos quibusdam fugit amet sapiente similique explicabo ea
            aperiam quas quisquam voluptatem dignissimos cum architecto
            recusandae facere? Veritatis soluta ipsam saepe rem aut. Pariatur,
            est numquam odio, voluptatibus consequuntur mollitia at distinctio
            doloremque modi nesciunt ad reprehenderit nihil!
          </p>
          <p className="py-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quam deleniti sapiente qui quaerat placeat earum, ut pariatur dicta
            hic, adipisci recusandae voluptatum corrupti impedit eaque
            asperiores libero ab natus quae repellendus consectetur vitae,
            aspernatur quo. Repudiandae, voluptate suscipit. Expedita, eveniet
            laborum ipsum, voluptatem molestiae voluptatibus, blanditiis ipsa
            illo ullam odio qui reiciendis pariatur nihil. Ipsam deleniti
            facilis hic fugiat incidunt aut sint rerum! Rem officiis nulla
            recusandae cum laudantium tenetur quas aliquid nam facilis eius
            animi labore, eaque ea necessitatibus veniam reprehenderit ipsum
            corrupti repellat repudiandae, impedit distinctio optio vero. Vitae
            quasi eaque quas quam autem ab reprehenderit dolores.
          </p>
        </div>
        <div className="flex mt-3 justify-center items-center w-1/2 h-12 bg-slate-200">
          <h1>Price :- {event.price} </h1>
        </div>
        <div className="flex flex-col px-12 mt-4 text-center justify-center items-center">
          <h2 className="text-2xl text-teal-400 gap-2">
            <b>Event Head Name :- </b> {event?.eventHead?.name}{" "}
          </h2>
          <h2 className="text-xl gap-2">
            <b>Event Head Email :- </b> {event?.eventHead?.email}{" "}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
