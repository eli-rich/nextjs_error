'use client';
import { useEffect } from 'react';
export default function ContentWrapper({ serverHTML }: { serverHTML: string }) {
  useEffect(() => {
    let elements = Array.from(document.querySelectorAll('p > img'));
    elements = elements.map((element) => element.parentElement) as HTMLElement[];
    elements.forEach((element) => {
      element.classList.add('ff-fix');
    });
  }, []);
  return (
    <article className='prose prose-p:leading-snug prose-ul:leading-tight prose-li:leading-tight prose-ol:leading-tight max-w-none prose-p:my-0 prose-headings:font-normal prose-headings:my-0 prose-h1:border-b-4 prose-h1:border-rose-300 prose-img:w-[20%] prose-img:h-auto prose-img:my-2 prose-img:mx-4 prose-img:inline md:prose-img:max-w-xl prose-img:max-h-80 prose-img:shadow-lg prose-img:bg-[#f5f4ef] text-black prose-li:marker:text-black'>
      <div dangerouslySetInnerHTML={{ __html: serverHTML }} className='font-sans'></div>
    </article>
  );
}
