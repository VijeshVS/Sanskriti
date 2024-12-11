"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";

interface TimelineItem {
	year: number;
	content: string;
	image: string;
}

const TimelineComponent: React.FC = () => {
	const [activeYear, setActiveYear] = useState<number | null>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

	const timelineData: TimelineItem[] = [
		{
			"year": 78,
			"content": "The Saka Era begins, marking a significant calendar used across Indian traditions, influencing festivals and historical records.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 150,
			"content": "The Kushan Empire flourishes, fostering cultural exchanges along the Silk Road and introducing Gandhara art blending Indian and Hellenistic styles.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 320,
			"content": "The Gupta Empire begins, initiating India's classical age with advancements in arts, literature, and architecture, including the Iron Pillar of Delhi.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 405,
			"content": "Fa-Hien, a Chinese traveler, visits India, documenting Indian culture, Buddhism, and the societal structure of the Gupta period.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 600,
			"content": "The Pallava dynasty contributes to South Indian temple architecture, constructing magnificent structures like the Shore Temple at Mahabalipuram.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 850,
			"content": "The Chola dynasty emerges as patrons of art and architecture, commissioning iconic temples such as the Brihadeeswarar Temple at Thanjavur.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1010,
			"content": "The completion of the Brihadeeswarar Temple showcases the pinnacle of Chola architectural and cultural achievements in South India.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1192,
			"content": "The Qutb Minar is constructed, symbolizing the early Indo-Islamic architectural style during the Delhi Sultanate period.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1398,
			"content": "The Bhakti movement emerges, with saints like Namdev and Kabir spreading messages of spiritual equality and devotional love through poetry.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1498,
			"content": "Vasco da Gama's arrival in India establishes direct sea trade with Europe, introducing new cultural influences and exchanges.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1565,
			"content": "The Vijayanagara Empire falls after the Battle of Talikota, marking the decline of a major cultural hub for art and architecture.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1603,
			"content": "The Mughal Empire sees a cultural zenith under Emperor Akbar, promoting a synthesis of Hindu and Islamic art, culture, and literature.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1659,
			"content": "The Maratha Empire under Shivaji Maharaj revives indigenous cultural traditions and promotes Marathi language and literature.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1761,
			"content": "The Third Battle of Panipat marks a shift in power, influencing regional cultures and historical narratives across North India.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1828,
			"content": "Raja Ram Mohan Roy establishes the Brahmo Samaj, leading reforms in Indian society and championing modern education and cultural revival.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1875,
			"content": "The Arya Samaj is founded, aiming to reform Indian society by reviving Vedic traditions and promoting cultural and religious awareness.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1911,
			"content": "Rabindranath Tagore writes 'Jana Gana Mana,' later adopted as India's national anthem, symbolizing unity in diversity.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1920,
			"content": "Mahatma Gandhi leads the Non-Cooperation Movement, inspiring a cultural renaissance emphasizing swadeshi and self-reliance.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1951,
			"content": "The first Indian classical dance festival, Kalakshetra, is held, celebrating Bharatanatyam and other traditional art forms.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 1986,
			"content": "The Namami Gange program begins to restore the Ganges River's cultural and ecological significance in Indian tradition.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 2000,
			"content": "The Khajuraho Group of Monuments is declared a UNESCO World Heritage Site, honoring its intricate carvings and cultural importance.",
			"image": "/api/placeholder/300/200"
		  },
		  {
			"year": 2019,
			"content": "Yoga Day gains international recognition, reflecting India's influence on global wellness and cultural heritage.",
			"image": "/api/placeholder/300/200"
		  }
	];

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
			if (!timelineRef.current) return;

			const timelineRect = timelineRef.current.getBoundingClientRect();
			const mouseY = e.clientY - timelineRect.top;

			const entries = Array.from(
				timelineRef.current.querySelectorAll(
					"[data-year]"
				) as NodeListOf<HTMLElement>
			);

			entries.forEach((entry) => {
				const entryRect = entry.getBoundingClientRect();
				const entryTop = entryRect.top - timelineRect.top;
				const entryBottom = entryTop + entryRect.height;

				if (mouseY >= entryTop && mouseY <= entryBottom) {
					const year = entry.getAttribute("data-year");
					if (year) {
						setActiveYear(parseInt(year, 10));
					}
				}
			});
		};

		const currentRef = timelineRef.current;
		if (currentRef) {
			currentRef.addEventListener(
				"mousemove",
				handleMouseMove as unknown as EventListener
			);
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener(
					"mousemove",
					handleMouseMove as unknown as EventListener
				);
			}
		};
	}, []);

	return (
		<div
			ref={timelineRef}
			className="relative w-full max-w-5xl mx-auto h-[600px] overflow-y-scroll py-10 scroll-smooth scrollbar-hide"
		>
			{timelineData.map((item) => (
				<div
					key={item.year}
					data-year={item.year}
					className={`
            flex items-center mb-10 transition-all duration-300 ease-in-out
            ${activeYear === item.year ? "scale-[1.03]" : "scale-100"}
          `}
				>
					{/* Year Column */}
					<div
						className={`
              w-40 text-right pr-10 font-bold transition-all duration-300
              ${
								activeYear === item.year
									? "text-3xl text-black"
									: "text-2xl text-black/70"
							}
            `}
					>
						{item.year}
					</div>

					{/* Image Box */}
					<div
						className={`w-96 h-52 mr-4 overflow-hidden rounded-lg shadow-lg transition-all duration-300
              ${
								activeYear === item.year
									? "scale-[1.02] border-2 border-gray-300"
									: "scale-100 border-2 border-transparent"
							}
            `}
					>
						<img
							src={item.image}
							alt={`Timeline image for ${item.year}`}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Content Box */}
					<div
						className={`
              bg-yellow-50 p-6 rounded-lg shadow-lg w-96 transition-all duration-300
              ${
								activeYear === item.year
									? "scale-[1.02] border-2 border-gray-300"
									: "scale-100 border border-gray-200"
							}
            `}
					>
						<div className="h-full overflow-hidden">{item.content}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TimelineComponent;