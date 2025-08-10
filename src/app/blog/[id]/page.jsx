import React from "react";
import Image from "next/image";
import nestedBlog from "../../../../public/assets/images/jpg/nested-blog.jpg";
import avatar from "../../../../public/assets/images/svgs/avatar.svg";
import { date } from "../../../../utils/getYear";
export default function BlogPostPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Section: Title + Intro + Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            Lorem ipsum dolor sit amet consectetur adipisicing elite.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4 text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
            omnis odio voluptas illum possimus assumenda dignissimos ex rem,
            fugit quod, consequuntur alias voluptatibus adipisci sint odit
            maiores? Praesentium, itaque exercitationem?
          </p>
          <div className="flex items-center gap-4">
            <Image
              classNmae="w-10 h-10 rounded-full"
              src={avatar}
              alt="Jese Leos"
              width={40}
              height={40}
            />
            <div className="font-medium dark:text-white">
              <div>Junaid</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Joined in {date}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[300px] md:h-[300px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={nestedBlog}
            alt="Blog Featured"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Main Blog Content */}
      <article className="mt-10 text-gray-700 leading-relaxed space-y-4 ">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
          obcaecati repellat in vel nobis dolore, blanditiis magnam ut
          aspernatur doloribus officia deleniti veniam voluptatum quos nam
          error, odio hic. Accusamus esse itaque cum velit nisi aperiam sunt
          asperiores modi magni nulla earum autem odit nobis corrupti repellat
          nam quidem, provident natus deleniti fuga exercitationem.
        </p>
        <p>
          Dolorem earum natus facilis iure, ullam blanditiis et fuga voluptas
          dolores incidunt, pariatur nostrum nam voluptatem omnis recusandae!
          Error dicta iste dolorum dolores suscipit quod architecto consequuntur
          tenetur quisquam inventore est, ipsam ad sint atque iure aliquam.
          Suscipit velit, molestias porro, qui facere quibusdam asperiores nam
          rem consequuntur incidunt repellendus numquam veniam quisquam ea illo,
          aspernatur beatae cumque corrupti.
        </p>
        <p>
          Rerum nisi magni suscipit voluptate soluta porro saepe. Unde quam,
          soluta perspiciatis perferendis consectetur velit in ex quidem tenetur
          voluptatibus? Quisquam non deleniti, saepe officiis asperiores odit
          possimus vel similique eaque eligendi sapiente illo autem hic,
          cupiditate tempora! Iusto odio voluptate quas nostrum dolores
          reprehenderit rerum doloribus ad dignissimos.
        </p>
        <p>
          Velit voluptas quibusdam, numquam non maxime error, ipsa suscipit
          sequi molestias eum, mollitia repellendus amet vitae omnis sunt
          possimus sint? Ea dolorem maiores hic soluta provident architecto
          iusto voluptates quod perferendis accusamus minus obcaecati vitae
          dolore suscipit nisi, eligendi sit, vero et harum, velit temporibus
          officiis optio? Atque illo esse praesentium ut a iste itaque soluta,
          nesciunt debitis numquam inventore sed reiciendis beatae sapiente
          architecto adipisci quia voluptas consectetur.
        </p>
      </article>
    </section>
  );
}
