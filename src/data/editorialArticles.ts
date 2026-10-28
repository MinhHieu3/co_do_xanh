export type EditorialSection = { h: string; p: string[] };
export type EditorialLanguage = { title: string; desc: string; intro: string; sections: EditorialSection[]; conclusion: string };
export type EditorialArticle = {
    slug: string;
    image: string;
    date: string;
    modified: string;
    category: { VI: string; EN: string };
    VI: EditorialLanguage;
    EN: EditorialLanguage;
};

export const articles: EditorialArticle[] = [
    {
        slug: "5-dieu-can-biet-truoc-khi-du-lich-ninh-binh",
        image: "/ebike/img/post.jpg",
        date: "2026-10-28",
        modified: "2026-10-28",
        category: { VI: "Kinh nghiệm", EN: "Travel tips" },
        VI: {
            title: "5 điều cần biết trước khi đi du lịch Ninh Bình để có chuyến đi trọn vẹn",
            desc: "5 kinh nghiệm du lịch Ninh Bình: kiểm tra thời tiết, lên lịch trình, dự trù ngân sách, chọn phương tiện và lưu sẵn địa chỉ thuê xe máy điện.",
            intro: "Ninh Bình là điểm đến hấp dẫn với cảnh quan núi đá vôi, sông nước và nhiều địa danh nổi tiếng như Tràng An, Tam Cốc, Hang Múa. Tuy nhiên, để chuyến du lịch diễn ra thuận lợi, bạn nên chuẩn bị trước một số điều quan trọng. Dưới đây là 5 kinh nghiệm du lịch Ninh Bình giúp bạn chủ động hơn về thời gian, chi phí và phương tiện di chuyển.",
            sections: [
                {
                    h: "1. Kiểm tra thời tiết trước chuyến đi", p: [
                        "Thời tiết ảnh hưởng trực tiếp đến trải nghiệm tham quan, đặc biệt là các hoạt động ngoài trời như đi thuyền, leo núi và chụp ảnh. Trước khi khởi hành, bạn nên kiểm tra dự báo thời tiết, chuẩn bị trang phục phù hợp và mang theo áo mưa hoặc đồ chống nắng khi cần thiết."
                    ]
                },
                {
                    h: "2. Lên lịch trình tham quan hợp lý", p: [
                        "Ninh Bình có nhiều địa điểm nổi tiếng như Tràng An, Tam Cốc, Hang Múa và cố đô Hoa Lư. Thay vì cố gắng ghé thăm quá nhiều nơi trong một ngày, bạn nên lựa chọn những điểm đến phù hợp với sở thích và thời gian của mình.",
                        "Một lịch trình thoải mái sẽ giúp bạn có nhiều thời gian tận hưởng cảnh đẹp, trải nghiệm ẩm thực và lưu giữ những khoảnh khắc đáng nhớ."
                    ]
                },
                {
                    h: "3. Dự trù ngân sách du lịch", p: [
                        "Để kiểm soát chi phí, bạn nên dự trù trước các khoản như: chi phí di chuyển đến Ninh Bình; vé tham quan các địa điểm; ăn uống và lưu trú; thuê phương tiện đi lại; và các khoản phát sinh.",
                        "Việc chuẩn bị ngân sách giúp chuyến đi thoải mái hơn mà không phải lo lắng quá nhiều về chi tiêu."
                    ]
                },
                {
                    h: "4. Lựa chọn phương tiện di chuyển phù hợp", p: [
                        "Các điểm tham quan tại Ninh Bình nằm ở nhiều khu vực khác nhau. Vì vậy, lựa chọn phương tiện phù hợp sẽ giúp bạn chủ động hơn trong lịch trình. Nếu thích khám phá theo nhịp độ riêng, bạn có thể cân nhắc thuê xe máy điện để linh hoạt di chuyển, dừng chân chụp ảnh và trải nghiệm những cung đường đẹp.",
                        "Khi thuê xe, hãy kiểm tra tình trạng xe, mức pin, quãng đường dự kiến và trao đổi trước với đơn vị cho thuê về nhu cầu di chuyển."
                    ]
                },
                {
                    h: "5. Lưu sẵn địa chỉ thuê xe tại Ninh Bình", p: [
                        "Nếu đang tìm địa chỉ thuê xe máy điện tại Ninh Bình, bạn có thể tham khảo Xe Cố Đô Xanh. Dịch vụ hướng đến trải nghiệm di chuyển linh hoạt, thuận tiện cho du khách muốn tự mình khám phá vẻ đẹp của vùng đất cố đô.",
                        "Thông tin liên hệ Xe Cố Đô Xanh:",
                        "• Giá thuê xe máy điện: Từ 150.000 VNĐ/ngày",
                        "• Địa chỉ: Số 61, ngõ 281 đường Đinh Tiên Hoàng, Hoa Lư, Ninh Bình",
                        "• Zalo: 0866 399 986 – 0936 112 997",
                        "• WhatsApp: +84 866 399 986",
                        "• Website: https://xecodoxanh.com"
                    ]
                }
            ],
            conclusion: "Một chuyến du lịch Ninh Bình đáng nhớ không nhất thiết phải có lịch trình dày đặc. Chỉ cần chuẩn bị thời tiết, kế hoạch, ngân sách và phương tiện phù hợp, bạn đã có thể tận hưởng hành trình một cách thoải mái hơn. Đến Ninh Bình, khám phá theo cách của bạn cùng Xe Cố Đô Xanh!"
        },
        EN: {
            title: "5 Things to Know Before Visiting Ninh Binh for a Perfect Trip",
            desc: "5 Ninh Binh travel tips: check the weather, plan your itinerary, set a budget, choose the right transport and save a trusted e-motorbike rental address.",
            intro: "Ninh Binh is a captivating destination with limestone karsts, winding rivers and famous sites such as Trang An, Tam Coc and Mua Cave. To make your trip go smoothly, it helps to prepare a few things in advance. Here are 5 tips to help you manage your time, budget and transport.",
            sections: [
                {
                    h: "1. Check the weather before you go", p: [
                        "Weather directly affects your sightseeing, especially outdoor activities like boat trips, climbing and photography. Check the forecast before departure, dress appropriately and bring a raincoat or sun protection when needed."
                    ]
                },
                {
                    h: "2. Plan a realistic itinerary", p: [
                        "Ninh Binh has many famous places such as Trang An, Tam Coc, Mua Cave and the ancient capital of Hoa Lu. Instead of trying to visit too many places in one day, choose destinations that match your interests and time.",
                        "A relaxed schedule gives you more time to enjoy the scenery, try local food and capture memorable moments."
                    ]
                },
                {
                    h: "3. Set a travel budget", p: [
                        "To keep costs under control, plan ahead for: transport to Ninh Binh; attraction tickets; food and accommodation; vehicle rental; and unexpected expenses.",
                        "Budgeting in advance lets you enjoy the trip without worrying too much about spending."
                    ]
                },
                {
                    h: "4. Choose the right transport", p: [
                        "Ninh Binh's attractions are spread across different areas, so the right transport keeps your schedule flexible. If you like exploring at your own pace, consider renting an electric motorbike to move freely, stop for photos and enjoy scenic roads.",
                        "When renting, check the vehicle's condition, battery level and expected distance, and discuss your travel plans with the rental provider in advance."
                    ]
                },
                {
                    h: "5. Save a rental address in Ninh Binh", p: [
                        "If you're looking for an electric motorbike rental in Ninh Binh, consider Xe Co Do Xanh — a service focused on flexible, convenient travel for visitors who want to explore the ancient capital on their own.",
                        "Xe Co Do Xanh contact:",
                        "• Electric motorbike rental: From VND 150,000/day",
                        "• Address: No. 61, Lane 281 Dinh Tien Hoang Street, Hoa Lu, Ninh Binh",
                        "• Zalo: 0866 399 986 – 0936 112 997",
                        "• WhatsApp: +84 866 399 986",
                        "• Website: https://xecodoxanh.com"
                    ]
                }
            ],
            conclusion: "A memorable Ninh Binh trip doesn't need a packed schedule. With the right preparation for weather, plans, budget and transport, you can enjoy the journey comfortably. Come to Ninh Binh and explore your way with Xe Co Do Xanh!"
        }
    },
    {
        slug: "gia-thue-xe-may-dien-ninh-binh",
        image: "/ebike/img/motorbikes-1100.webp",
        date: "2026-10-10",
        modified: "2026-10-15",
        category: { VI: "Giá & thủ tục", EN: "Prices & rules" },
        VI: {
            title: "Giá thuê xe máy điện Ninh Bình 2026: đọc bảng giá thế nào để chọn đúng xe?",
            desc: "Cập nhật giá thuê xe máy điện và xe đạp trợ lực tại Ninh Bình, các khoản cần hỏi trước khi nhận xe và cách chọn thời lượng thuê phù hợp lịch trình.",
            intro: "Một chuyến đi Ninh Bình có thể gói trong vài điểm gần nhau hoặc kéo dài từ sáng đến tối qua nhiều khu tham quan. Vì vậy, giá thuê xe không nên được nhìn như một con số đơn lẻ: loại xe, số giờ sử dụng, điểm giao nhận và tình trạng pin đều ảnh hưởng đến tổng chi phí. Dưới đây là mức giá đang được Xe Cố Đô Xanh công bố cùng những câu hỏi nên làm rõ trước khi đặt.",
            sections: [
                {
                    h: "Mức giá tham khảo hiện tại", p: [
                        "Theo bảng giá đang công bố, xe máy điện có giá 150.000 đồng mỗi 24 giờ; xe đạp trợ lực Phoenix có giá 120.000 đồng mỗi 24 giờ. Với nhu cầu ngắn hơn, mức thuê 5 giờ lần lượt là 100.000 đồng cho xe máy điện và 80.000 đồng cho xe đạp trợ lực. Giá có thể được điều chỉnh theo thời điểm, tình trạng xe hoặc chương trình của cửa hàng, vì vậy hãy xác nhận lại trước ngày nhận.",
                        "Các mức trên giúp so sánh hai lựa chọn cơ bản, nhưng không tự động bao gồm mọi tình huống phát sinh. Nếu lịch trình chưa chắc chắn, hãy hỏi cách tính khi trả muộn, gia hạn thêm giờ hoặc đổi sang thuê theo ngày. Xác nhận bằng tin nhắn giúp cả hai bên cùng nắm rõ thỏa thuận."
                    ]
                },
                {
                    h: "Chọn thời lượng theo lịch trình, không chỉ theo giá thấp", p: [
                        "Gói 5 giờ phù hợp hơn khi bạn chỉ cần di chuyển trong một nửa ngày hoặc kết hợp xe với tour thuyền, điểm tham quan có thời gian cố định. Gói 24 giờ thuận tiện nếu muốn chủ động dừng ăn, nghỉ hoặc đổi kế hoạch mà không phải căn từng giờ. Hãy tính cả thời gian nhận và trả xe theo quy định của cửa hàng.",
                        "Xe đạp trợ lực thường hợp với những cung đường ngắn, tốc độ thư thả và hành lý gọn. Xe máy điện phù hợp hơn khi quãng đường dự kiến dài, cần di chuyển giữa các cụm điểm hoặc đi cùng người thân. Số người đi, loại bằng lái cần có và khả năng điều khiển xe cũng nên được cân nhắc trước khi quyết định."
                    ]
                },
                {
                    h: "Bốn khoản cần xác nhận trước khi đặt", p: [
                        "Hãy hỏi rõ giá đã gồm những phụ kiện nào, xe được giao và nhận ở đâu, cần chuẩn bị giấy tờ gì, và chính sách đặt cọc hoặc thanh toán ra sao. Với xe điện, cần hỏi thêm tình trạng pin lúc bàn giao, cách sạc hoặc đổi pin, cùng đầu mối hỗ trợ nếu xe gặp trục trặc trên đường.",
                        "Nếu cửa hàng tính phí giao ngoài khu vực, phí trả xe muộn hoặc phụ phí vào ngày cao điểm, hãy yêu cầu báo tổng trước khi xác nhận. Đây là cách so sánh công bằng hơn giữa các đơn vị: cùng loại xe, cùng thời lượng và cùng điều kiện giao nhận."
                    ]
                },
                {
                    h: "So sánh chi phí sử dụng thực tế", p: [
                        "Giá thuê ban đầu không phản ánh toàn bộ chi phí chuyến đi. Với xe chạy xăng, người thuê còn phải dự trù nhiên liệu; với xe điện, nên tính quãng đường, mức pin và khả năng sạc/đổi pin theo đúng dòng xe. Không nên mặc định một lần sạc luôn đủ cho mọi hành trình, bởi tải trọng, tốc độ, địa hình và cách vận hành đều có thể làm thay đổi quãng đường sử dụng.",
                        "Ngoài chi phí, hãy so sánh chất lượng bàn giao: phanh, lốp, đèn, còi, gương, khóa và giấy tờ xe. Một chiếc xe phù hợp, được kiểm tra kỹ và có nơi hỗ trợ rõ ràng thường giúp chuyến đi dễ dự tính hơn việc chỉ chọn mức giá thấp nhất."
                    ]
                },
                {
                    h: "Cách đặt xe để tránh hiểu nhầm", p: [
                        "Khi gửi yêu cầu, nêu ngày giờ nhận, ngày giờ trả, số người đi và địa điểm giao xe. Nếu có hành lý hoặc muốn ghé nhiều điểm xa nhau, hãy nói trước để cửa hàng tư vấn dòng xe phù hợp. Trước khi rời điểm nhận, chụp lại tình trạng xe và kiểm tra mức pin cùng các phụ kiện đã nhận.",
                        "Giá niêm yết là điểm bắt đầu để lập ngân sách, không thay thế xác nhận cuối cùng với đơn vị cho thuê. Một cuộc trao đổi ngắn trước chuyến đi có thể giúp làm rõ điều kiện, giữ xe đúng nhu cầu và tránh phát sinh ngoài dự kiến."
                    ]
                }
            ],
            conclusion: "Tóm lại, mức giá hiện công bố tại Xe Cố Đô Xanh bắt đầu từ 80.000 đồng cho 5 giờ với xe đạp trợ lực và 100.000 đồng cho 5 giờ với xe máy điện; thuê 24 giờ lần lượt là 120.000 và 150.000 đồng. Hãy xác nhận giá, điều kiện giao nhận và pin theo đúng ngày đi trước khi chốt lịch."
        },
        EN: {
            title: "Electric Motorbike Rental Prices in Ninh Binh 2026: How to Compare Your Options",
            desc: "Current electric motorbike and e-bike rental prices in Ninh Binh, what to confirm before pickup, and how to choose a rental period that fits your itinerary.",
            intro: "A day in Ninh Binh may involve a few nearby stops or a full itinerary spread across several attractions. Rental cost is therefore more than a single headline number: vehicle type, rental duration, delivery arrangements and battery condition all matter. This guide summarizes Xe Co Do Xanh's published rates and the questions worth asking before you book.",
            sections: [
                {
                    h: "Current published rates", p: [
                        "The published rate is VND 150,000 per 24 hours for an electric motorbike and VND 120,000 per 24 hours for a Phoenix pedal-assist e-bike. For a shorter outing, the five-hour rates are VND 100,000 and VND 80,000 respectively. Prices may change with dates, availability or promotions, so confirm the rate with the rental shop before pickup.",
                        "These figures make it easier to compare the two basic options, but they do not answer every question about extra time or a changed return plan. Ask how late returns, extensions and a switch from hourly to daily rental are handled. A written message gives both sides a clear record of the arrangement."
                    ]
                },
                {
                    h: "Choose a rental period around your plans", p: [
                        "A five-hour rental can suit a half-day outing or a route that includes a boat trip with a fixed duration. A 24-hour rental gives more flexibility for meal breaks, rest stops and itinerary changes. Check exactly when the rental clock starts and ends under the shop's terms.",
                        "A pedal-assist e-bike is often a practical choice for shorter, slower routes with light luggage. An electric motorbike may suit longer distances, travel between separate attraction areas or riding with a companion. Consider passenger count, licence requirements and your confidence on the vehicle before choosing."
                    ]
                },
                {
                    h: "Four details to confirm before booking", p: [
                        "Ask which accessories are included, where the vehicle will be delivered and returned, what identification is required, and how deposits or payment work. For an electric vehicle, also confirm the battery level at handover, the charging or battery-swap arrangement and who to contact if a problem occurs on the road.",
                        "If delivery outside the usual area, late return or peak-date service carries an extra fee, ask for the full total before confirming. This makes comparisons between rental providers more meaningful: same vehicle class, rental duration and delivery conditions."
                    ]
                },
                {
                    h: "Compare the real cost of the ride", p: [
                        "The rental rate is only one part of a trip budget. Petrol vehicles require a fuel allowance; electric vehicles require a realistic estimate of distance and a plan for charging or battery swaps for that specific model. Do not assume one charge will cover every route, since load, speed, terrain and riding style all affect usable range.",
                        "Cost is not the only measure. Check the brakes, tyres, lights, horn, mirrors, lock and vehicle documents before setting off. A suitable, well-checked vehicle with a clear support contact can make a trip easier to plan than choosing solely by the lowest advertised price."
                    ]
                },
                {
                    h: "A booking checklist", p: [
                        "When you send a request, include pickup and return times, passenger count and delivery location. Mention luggage or a route with distant stops so the shop can recommend a suitable model. At handover, photograph the vehicle's condition and check the battery level and included accessories.",
                        "An advertised rate is a useful budgeting reference, not a substitute for confirming the final terms with the rental provider. A short conversation before travel can clarify conditions, help reserve the right vehicle and reduce surprises."
                    ]
                }
            ],
            conclusion: "At the published rates, five hours starts at VND 80,000 for a pedal-assist e-bike and VND 100,000 for an electric motorbike; 24-hour rentals are VND 120,000 and VND 150,000 respectively. Confirm the date-specific price, delivery terms and battery arrangement before setting off."
        }
    },
    {
        slug: "lich-trinh-tam-coc-trang-an-1-ngay",
        image: "/ebike/img/place-trang-an-640.webp",
        date: "2026-10-08",
        modified: "2026-10-15",
        category: { VI: "Cẩm nang du lịch", EN: "Travel guide" },
        VI: {
            title: "Một ngày ở Tam Cốc, Tràng An và Hang Múa: xếp lịch thế nào để đỡ vội?",
            desc: "Lịch trình tham khảo một ngày tại Ninh Bình, cách gom điểm theo khu vực, dự trù thời gian và chọn xe phù hợp cho từng chặng.",
            intro: "Tam Cốc, Tràng An và Hang Múa thường cùng xuất hiện trong danh sách điểm đến của khách lần đầu tới Ninh Bình. Nhưng cố đi thật nhiều nơi trong một ngày có thể biến chuyến tham quan thành cuộc chạy đua với đồng hồ. Lịch trình dưới đây ưu tiên gom điểm theo khu vực, dành đủ thời gian cho trải nghiệm chính và để lại khoảng linh hoạt cho thời tiết, bữa ăn hoặc thời gian chờ.",
            sections: [
                {
                    h: "Buổi sáng: bắt đầu ở Hang Múa hoặc Tam Cốc", p: [
                        "Nếu muốn leo Hang Múa, nên đi vào buổi sáng sớm để tránh phần nóng nhất trong ngày. Chặng lên đỉnh có nhiều bậc đá; hãy mang giày bám tốt, nước uống và dành thời gian nghỉ trên đường. Người đi cùng trẻ nhỏ hoặc có vấn đề về vận động nên cân nhắc mức độ phù hợp trước khi khởi hành.",
                        "Nếu ưu tiên trải nghiệm nhẹ nhàng, có thể bắt đầu ở Tam Cốc và chọn chuyến thuyền phù hợp với quỹ thời gian. Thời gian thực tế tại bến có thể thay đổi theo lượng khách, vì vậy đừng ghép một hoạt động có giờ cố định quá sát ngay sau đó."
                    ]
                },
                {
                    h: "Cuối buổi sáng: chọn một điểm gần thay vì thêm nhiều điểm", p: [
                        "Sau hoạt động đầu tiên, hãy chọn Bích Động hoặc một điểm dừng ăn trưa, thay vì cố đi qua mọi địa danh lân cận. Bích Động phù hợp với nhịp tham quan chậm; cần lưu ý trang phục và quy tắc ứng xử tại khu vực chùa.",
                        "Khoảng cách di chuyển giữa các điểm nhìn trên bản đồ thường ngắn, nhưng thời gian gửi xe, đi bộ, chờ lượt và nghỉ chân vẫn cần được tính vào lịch. Dự trù một khoảng đệm giúp chuyến đi bớt căng thẳng nếu gặp đông khách hoặc mưa."
                    ]
                },
                {
                    h: "Buổi chiều: dành đủ thời gian cho Tràng An", p: [
                        "Tràng An là trải nghiệm đường thủy, không chỉ là một điểm dừng chụp ảnh. Hãy xem giờ hoạt động, các tuyến thuyền đang mở và thời gian dự kiến của tuyến trước khi mua vé. Nếu chọn Tràng An vào buổi chiều, nên đến đủ sớm để không phải rút ngắn hoạt động vì giờ đóng cửa.",
                        "Trong lúc đi thuyền, tuân thủ hướng dẫn của người chèo đò, mặc áo phao khi được yêu cầu và giữ gìn cảnh quan. Điện thoại, máy ảnh và đồ cá nhân nên được cất gọn để tránh rơi xuống nước."
                    ]
                },
                {
                    h: "Di chuyển bằng xe điện: tính cả quãng đường quay về", p: [
                        "Đừng chỉ cộng quãng đường giữa các điểm; hãy tính cả hành trình từ nơi lưu trú tới điểm đầu, chặng quay về và các đoạn đi nhầm hoặc đổi kế hoạch. Mức pin sử dụng thay đổi theo tải trọng, tốc độ, địa hình và dòng xe. Hỏi rõ phạm vi hoạt động tham khảo của mẫu xe được giao và phương án hỗ trợ nếu pin xuống thấp.",
                        "Xe đạp trợ lực hợp với chặng ngắn và nhịp đi chậm; xe máy điện có thể thuận tiện hơn nếu lịch trình trải rộng. Trước khi đi, kiểm tra phanh, lốp, đèn và mức pin, đồng thời lưu số liên hệ của đơn vị cho thuê. Không nên cố tiếp tục hành trình khi xe có dấu hiệu bất thường."
                    ]
                },
                {
                    h: "Một lịch trình mẫu có khoảng trống", p: [
                        "Buổi sáng có thể dành cho Hang Múa; gần trưa nghỉ ăn và chọn Bích Động nếu còn thời gian; buổi chiều đi Tràng An. Đây là thứ tự tham khảo, không phải lịch cố định. Nếu ưu tiên chuyến thuyền dài hoặc thời tiết nóng, hãy bỏ bớt một điểm thay vì rút ngắn mọi trải nghiệm.",
                        "Trước ngày đi, kiểm tra thời tiết, giờ hoạt động và thông tin vé từ đơn vị quản lý điểm tham quan. Hãy thống nhất điểm nhận xe, giờ trả và phương án di chuyển dự phòng, nhất là khi lịch trình kết thúc muộn."
                    ]
                }
            ],
            conclusion: "Một ngày đủ để có trải nghiệm đáng nhớ nếu lịch trình tập trung vào vài điểm phù hợp. Chọn một hoạt động chính vào buổi sáng, dành buổi chiều cho Tràng An hoặc Tam Cốc, và luôn giữ thời gian dự phòng cho việc di chuyển, nghỉ ngơi cùng điều kiện thực tế."
        },
        EN: {
            title: "Tam Coc, Trang An and Mua Cave in One Day: A More Realistic Itinerary",
            desc: "A practical one-day Ninh Binh itinerary, with nearby stops grouped together, time allowances and transport considerations for each leg.",
            intro: "Tam Coc, Trang An and Mua Cave often appear together on first-time visitors' lists. Trying to fit every stop into one day, however, can turn a visit into a race against the clock. This suggested route groups nearby places, leaves time for the main experience and keeps room for weather, meals and queues.",
            sections: [
                {
                    h: "Morning: start at Mua Cave or Tam Coc", p: [
                        "If you plan to climb Mua Cave, an early start helps avoid the hottest part of the day. The climb involves many stone steps, so wear shoes with good grip, carry water and allow time to rest. Travellers with young children or mobility concerns should consider whether the climb is suitable for them.",
                        "For a gentler start, begin at Tam Coc and choose a boat trip that fits your available time. Waiting times at the pier can vary, so avoid scheduling another fixed-time activity immediately after the boat ride."
                    ]
                },
                {
                    h: "Late morning: choose one nearby stop", p: [
                        "After the first activity, choose Bich Dong or a relaxed lunch stop rather than trying to cover every nearby attraction. Bich Dong suits a slower visit; dress and behave respectfully around the pagoda.",
                        "Map distances can look short, but parking, walking, queues and rest breaks all take time. Leaving a buffer makes the day less stressful if the area is busy or rain arrives."
                    ]
                },
                {
                    h: "Afternoon: allow enough time for Trang An", p: [
                        "Trang An is a water-based experience, not simply a photo stop. Check operating hours, available boat routes and the expected duration before buying a ticket. If you visit in the afternoon, arrive early enough to avoid having to shorten the trip near closing time.",
                        "Follow the boat operator's instructions, wear a life jacket when required and help protect the landscape. Keep phones, cameras and other belongings secure to reduce the risk of dropping them in the water."
                    ]
                },
                {
                    h: "On an electric vehicle, plan the return journey too", p: [
                        "Do not count only the distance between attractions. Include the trip from your accommodation, the return leg and possible detours. Usable battery range varies with load, speed, terrain and vehicle model. Ask about the supplied model's expected range and what support is available if the battery runs low.",
                        "A pedal-assist e-bike can suit shorter, slower routes; an electric motorbike may be more practical when stops are spread out. Check brakes, tyres, lights and battery before leaving, and save the rental provider's contact details. Stop if the vehicle behaves unusually."
                    ]
                },
                {
                    h: "A sample plan with breathing room", p: [
                        "One option is Mua Cave in the morning, lunch and Bich Dong around midday if time allows, then Trang An in the afternoon. This is a flexible outline, not a fixed timetable. If the boat trip or hot weather takes longer, drop a stop instead of rushing every activity.",
                        "Before travelling, check the weather, opening hours and ticket information with the attraction operator. Confirm vehicle pickup and return arrangements, and consider a backup for the journey back if the day runs late."
                    ]
                }
            ],
            conclusion: "A memorable day is possible when the plan focuses on a few suitable stops. Choose one main morning activity, leave the afternoon for Trang An or Tam Coc, and keep a buffer for travel, rest and changing conditions."
        }
    },
    {
        slug: "thue-xe-may-dien-co-can-bang-lai-khong",
        image: "/ebike/img/riders-900.webp",
        date: "2026-10-06",
        modified: "2026-10-15",
        category: { VI: "Giá & thủ tục", EN: "Prices & rules" },
        VI: {
            title: "Thuê xe máy điện có cần bằng lái? Những điều cần xác minh trước khi nhận xe",
            desc: "Quy định phụ thuộc loại phương tiện và thông số đăng ký. Đây là cách kiểm tra giấy tờ, độ tuổi và điều kiện thuê trước khi chạy xe tại Ninh Bình.",
            intro: "Câu hỏi “xe máy điện có cần bằng lái không?” không thể trả lời chỉ bằng tên thương mại hoặc vẻ ngoài của chiếc xe. Quy định áp dụng phụ thuộc vào phân loại phương tiện và thông số kỹ thuật, trong khi khách thuê thường chỉ nhìn thấy tên mẫu xe trên website. Trước chuyến đi, hãy xác minh chiếc xe cụ thể mình sẽ nhận và đối chiếu với quy định hiện hành.",
            sections: [
                {
                    h: "Tên mẫu xe chưa đủ để xác định yêu cầu giấy phép", p: [
                        "Xe đạp điện trợ lực và xe máy điện không mặc nhiên thuộc cùng một nhóm phương tiện. Tốc độ thiết kế, công suất, cấu hình và thông tin đăng ký có thể ảnh hưởng đến cách phân loại. Hai xe có kiểu dáng gần giống nhau vẫn có thể khác yêu cầu sử dụng.",
                        "Vì quy định có thể được cập nhật, bài viết này không thay thế tư vấn pháp lý. Trước ngày thuê, hãy hỏi cửa hàng về đúng mẫu xe, thông tin trên giấy đăng ký và loại giấy phép người điều khiển cần có theo quy định đang áp dụng."
                    ]
                },
                {
                    h: "Độ tuổi và giấy tờ cá nhân", p: [
                        "Độ tuổi tối thiểu được điều khiển cũng phụ thuộc vào loại xe. Đừng suy luận rằng đủ tuổi thuê đồng nghĩa với đủ điều kiện lái xe. Nếu đi cùng người chưa thành niên, hãy xác minh trực tiếp quy định và điều kiện của đơn vị cho thuê trước khi đặt.",
                        "Khi nhận xe, chuẩn bị giấy tờ tùy thân theo hướng dẫn của cửa hàng. Nếu là khách quốc tế, hỏi trước giấy tờ nào được chấp nhận và có cần thêm giấy phép lái xe quốc tế hoặc giấy tờ liên quan hay không; câu trả lời phụ thuộc loại phương tiện và hồ sơ của người lái."
                    ]
                },
                {
                    h: "Hỏi cửa hàng những gì trước khi xác nhận", p: [
                        "Hãy gửi câu hỏi cụ thể: mẫu xe nào sẽ được giao, xe thuộc nhóm phương tiện nào, yêu cầu giấy phép ra sao, người lái cần mang giấy tờ gì và điều kiện bảo hiểm/đặt cọc như thế nào. Yêu cầu xác nhận bằng văn bản thay vì chỉ dựa vào câu quảng cáo “không cần bằng”.",
                        "Nếu thông tin trên trang bán hàng khác với giấy tờ xe hoặc lời tư vấn không rõ ràng, hãy tạm dừng đặt xe và kiểm tra với cơ quan chức năng hoặc nguồn pháp luật chính thức. Chọn mẫu xe khác phù hợp với điều kiện của mình là phương án an toàn hơn việc tự phỏng đoán."
                    ]
                },
                {
                    h: "Kiểm tra an toàn trước khi rời điểm nhận", p: [
                        "Thử phanh trước và sau, kiểm tra lốp, đèn, xi-nhan, còi, gương và khóa. Hỏi cách khởi động, cách dùng phanh và cách xử lý khi pin yếu. Nếu xe có dấu hiệu bất thường, yêu cầu đổi xe hoặc hướng dẫn xử lý trước khi đi.",
                        "Đội mũ bảo hiểm phù hợp, đi đúng làn và tốc độ, không sử dụng điện thoại khi lái và tuyệt đối không lái sau khi uống rượu bia. Lưu số hỗ trợ của cửa hàng, nhưng không để hỗ trợ thay thế cho việc kiểm tra xe và điều kiện pháp lý ban đầu."
                    ]
                },
                {
                    h: "Checklist ngắn cho người thuê", p: [
                        "Trước khi thanh toán, xác nhận đúng mẫu xe và tổng chi phí. Trước khi khởi hành, kiểm tra giấy tờ xe, điều kiện người lái, phụ kiện bàn giao và mức pin. Nếu đổi người điều khiển trong chuyến đi, cần xác minh người đó cũng đáp ứng điều kiện tương ứng.",
                        "Một phút hỏi kỹ có thể tránh việc phải đổi xe giữa chuyến hoặc gặp rắc rối trên đường. Khi còn nghi ngờ về phân loại hay giấy phép, hãy xác minh từ nguồn chính thức; đừng dựa riêng vào tốc độ quảng cáo hoặc tên model."
                    ]
                }
            ],
            conclusion: "Điều cần nhớ: hãy xác định loại phương tiện trên giấy tờ của đúng chiếc xe sẽ thuê, rồi kiểm tra điều kiện giấy phép và độ tuổi theo quy định hiện hành. Đừng coi tên gọi “xe điện” hay câu quảng cáo của bất kỳ nơi nào là kết luận pháp lý."
        },
        EN: {
            title: "Do You Need a Licence for an Electric Motorbike? What to Verify Before Pickup",
            desc: "Requirements depend on vehicle classification and registered specifications. Learn what to check about documents, age and rental conditions before riding in Ninh Binh.",
            intro: "The question “Do I need a licence for an electric motorbike?” cannot be answered from a brand name or a vehicle's appearance alone. The applicable rules depend on how the vehicle is classified and on its technical specifications, while renters may only see a model name on a website. Before travelling, verify the exact vehicle you will receive and check the current requirements.",
            sections: [
                {
                    h: "A model name alone does not determine licence rules", p: [
                        "A pedal-assist e-bike and an electric motorbike do not automatically belong to the same vehicle category. Design speed, power, configuration and registration details can affect classification. Two vehicles that look similar may have different requirements.",
                        "Regulations can change, and this article is not legal advice. Before renting, ask about the exact model, its registration details and the licence required for its rider under the rules currently in force."
                    ]
                },
                {
                    h: "Age and identity documents", p: [
                        "Minimum riding age also depends on vehicle category. Being old enough to rent does not necessarily mean someone is legally eligible to ride. If travelling with a minor, confirm the current requirements and the rental provider's conditions before booking.",
                        "Bring identification requested by the rental shop. International visitors should ask in advance which documents are accepted and whether an international driving permit or other paperwork is needed; the answer depends on the vehicle and the rider's circumstances."
                    ]
                },
                {
                    h: "Questions to ask the rental provider", p: [
                        "Ask which exact model will be supplied, how it is classified, what licence is required, which documents the rider must carry, and how insurance or deposits work. Request a written answer rather than relying only on a promotional claim such as “no licence needed.”",
                        "If a sales page conflicts with the vehicle documents or the advice is unclear, pause the booking and check an official legal source or the relevant authority. Choosing a different vehicle that fits your circumstances is safer than guessing."
                    ]
                },
                {
                    h: "A safety check before setting off", p: [
                        "Test the front and rear brakes, and check tyres, lights, indicators, horn, mirrors and lock. Ask how to start the vehicle, operate its brakes and respond to a low battery. If anything seems wrong, request a replacement or guidance before riding.",
                        "Wear a suitable helmet, follow traffic rules and speed limits, keep your phone away while riding, and never ride after drinking alcohol. Save the rental provider's support number, but do not treat roadside support as a substitute for checking legal eligibility and vehicle condition first."
                    ]
                },
                {
                    h: "A short renter checklist", p: [
                        "Before paying, confirm the exact vehicle and total cost. Before departure, check its documents, rider eligibility, included accessories and battery level. If another person may take over during the trip, verify that they also meet the applicable requirements.",
                        "A brief conversation can prevent a vehicle change or problem on the road. If classification or licence requirements remain uncertain, verify them through an official source; do not rely only on an advertised speed or model name."
                    ]
                }
            ],
            conclusion: "The key step is to identify the vehicle category shown in the documents for the specific vehicle you will rent, then verify current age and licence requirements. Do not treat the generic label “electric” or any rental advertisement as a legal determination."
        }
    },
    {
        slug: "dia-diem-du-lich-ninh-binh-khoang-cach",
        image: "/ebike/img/place-hoa-lu-640.webp",
        date: "2026-10-04",
        modified: "2026-10-15",
        category: { VI: "Điểm đến", EN: "Destinations" },
        VI: {
            title: "Sáu điểm đến Ninh Bình và cách ghép tuyến từ Tam Cốc",
            desc: "Gợi ý phân cụm Bích Động, Hang Múa, Thung Nham, Tràng An, Hoa Lư và Bái Đính theo khoảng cách, thời gian tham quan và loại xe.",
            intro: "Ninh Bình có nhiều điểm tham quan nổi tiếng nhưng chúng không nằm trong một cụm duy nhất. Xuất phát từ Tam Cốc, một số nơi có thể ghép trong nửa ngày; những điểm xa hơn cần thêm thời gian di chuyển và trải nghiệm tại chỗ. Các khoảng cách dưới đây chỉ để lập kế hoạch sơ bộ, có thể thay đổi theo vị trí lưu trú và tuyến đường thực tế.",
            sections: [
                {
                    h: "Nhóm gần Tam Cốc: Bích Động và Hang Múa", p: [
                        "Bích Động cách khu vực bến Tam Cốc khoảng vài kilômét; Hang Múa cũng là điểm có thể đi trong cùng khu vực nếu xuất phát sớm. Chặng đường ngắn không đồng nghĩa thời gian tham quan ngắn: Hang Múa cần thời gian leo bậc, còn Bích Động nên được dành một khoảng dừng yên tĩnh.",
                        "Hai điểm này có thể ghép trong một buổi nếu bạn chọn một hoạt động chính và không đặt lịch quá sát. Với người muốn leo Hang Múa, nên đi vào lúc mát; nếu ưu tiên nhịp chậm, dành buổi sáng cho Tam Cốc rồi ghé Bích Động."
                    ]
                },
                {
                    h: "Thung Nham: dành thời gian cho trải nghiệm tại chỗ", p: [
                        "Thung Nham nằm xa hơn nhóm điểm ngay quanh Tam Cốc và có nhiều hoạt động trong khu du lịch. Khoảng cách tham khảo từ Tam Cốc thường được ước tính khoảng 8 km, nhưng cần xem lại vị trí xuất phát và tuyến đường trước khi đi.",
                        "Nếu muốn trải nghiệm vườn chim, hãy kiểm tra khung giờ hoạt động và điều kiện thời tiết trong ngày. Không nên chỉ ghé nhanh để chụp ảnh rồi quay về; hãy tính thời gian di chuyển bên trong khu vực và đường về trước khi chọn phương tiện."
                    ]
                },
                {
                    h: "Tràng An và Hoa Lư: hai điểm có thể kết hợp nếu đủ thời gian", p: [
                        "Từ Tam Cốc đến Tràng An thường được ước tính khoảng 10 km, còn khu di tích Hoa Lư khoảng 16 km theo một số tuyến đường. Đây là các con số tham khảo, không phải cam kết quãng đường cố định; bản đồ tại thời điểm xuất phát sẽ cho chỉ dẫn phù hợp hơn.",
                        "Tràng An có chuyến thuyền kéo dài nhiều giờ, trong khi Hoa Lư cần thời gian tham quan các di tích. Có thể ghép hai điểm trong ngày nếu bắt đầu sớm, nhưng cần kiểm tra giờ vé và tránh xếp thêm điểm xa vào cuối buổi."
                    ]
                },
                {
                    h: "Bái Đính: cân nhắc một ngày riêng", p: [
                        "Bái Đính nằm xa hơn đáng kể so với các điểm quanh Tam Cốc; khoảng cách tham khảo có thể vào khoảng 25 km tùy điểm xuất phát và tuyến đường. Quy mô khuôn viên cũng khiến thời gian tham quan dài hơn dự tính nếu muốn đi nhiều khu vực.",
                        "Vì vậy, hãy cân nhắc dành riêng một buổi dài hoặc ghép với điểm gần đó thay vì kết hợp dày đặc với Tam Cốc, Hang Múa và Tràng An trong cùng ngày. Kiểm tra phương tiện nội khu, giờ hoạt động và kế hoạch trở về trước khi khởi hành."
                    ]
                },
                {
                    h: "Chọn xe theo địa hình và phạm vi di chuyển", p: [
                        "Xe đạp trợ lực phù hợp với cung đường ngắn, tốc độ thư thả và hành lý nhẹ. Xe máy điện thuận tiện hơn khi phải đi giữa các cụm điểm xa nhau, nhưng người lái cần đủ điều kiện theo quy định và tự tin điều khiển xe. Hãy xác nhận phạm vi pin của đúng mẫu xe thay vì dựa vào con số chung cho mọi loại xe.",
                        "Trước khi rời Tam Cốc, kiểm tra pin, phanh và lốp; lưu tuyến đường ngoại tuyến nếu kết nối mạng không ổn định. Dự trù pin cho cả chiều về, hạn chế chở quá tải và hỏi trước về phương án hỗ trợ khi xe gặp sự cố."
                    ]
                },
                {
                    h: "Cách lập tuyến không bị quá tải", p: [
                        "Có thể chia điểm đến thành ba cụm: Tam Cốc–Bích Động–Hang Múa; Tràng An–Hoa Lư; và Thung Nham hoặc Bái Đính tùy sở thích. Chọn một hoặc hai cụm cho mỗi ngày thường thực tế hơn việc chạy qua nhiều nơi chỉ để đánh dấu đã đến.",
                        "Thời gian trên đường phụ thuộc giờ cao điểm, thời tiết và hoạt động tại mỗi điểm. Trước ngày đi, kiểm tra giờ mở cửa, vé và tình trạng đường; giữ một khoảng trống để nghỉ, ăn uống hoặc thay đổi kế hoạch."
                    ]
                }
            ],
            conclusion: "Khoảng cách chỉ là một phần của hành trình. Hãy ghép điểm theo khu vực, tính thời gian tham quan thực tế và chọn phương tiện phù hợp quãng đường khứ hồi; như vậy bạn sẽ có thời gian trải nghiệm Ninh Bình thay vì chỉ di chuyển giữa các điểm."
        },
        EN: {
            title: "Six Ninh Binh Attractions: How to Group Stops from Tam Coc",
            desc: "Plan Bich Dong, Mua Cave, Thung Nham, Trang An, Hoa Lu and Bai Dinh by grouping nearby places, allowing time on site and choosing suitable transport.",
            intro: "Ninh Binh's best-known attractions are spread across several areas rather than one compact centre. Some stops can be combined in half a day from Tam Coc; others need more travel time and time on site. The distances below are planning estimates only and vary with your accommodation and the route you take.",
            sections: [
                {
                    h: "Near Tam Coc: Bich Dong and Mua Cave", p: [
                        "Bich Dong is a few kilometres from the Tam Coc pier area, and Mua Cave can also be reached within the same general area with an early start. A short ride does not mean a short visit: Mua Cave takes time to climb, while Bich Dong is best enjoyed at a slower pace.",
                        "The two can fit into one outing if you choose a main activity and avoid tight bookings. Visit Mua Cave during cooler hours if you plan to climb; for a gentler morning, spend time around Tam Coc before stopping at Bich Dong."
                    ]
                },
                {
                    h: "Thung Nham: allow time for the experience", p: [
                        "Thung Nham is farther from the immediate Tam Coc cluster and includes several activities within the site. A rough estimate from Tam Coc is around 8 km, but check your starting point and route before setting off.",
                        "If you want to see the bird garden, check its operating times and the day's weather. Avoid treating it as a quick photo stop: account for travel within the site and the return journey when choosing transport."
                    ]
                },
                {
                    h: "Trang An and Hoa Lu: combine only with enough time", p: [
                        "From Tam Coc, Trang An is often estimated at around 10 km and the Hoa Lu historic area around 16 km on some routes. These are planning figures, not fixed distances; a current map from your actual starting point is more useful.",
                        "A Trang An boat trip can take several hours, while Hoa Lu requires time to visit its historic sites. Combining both in one day is possible with an early start, but check ticket times and avoid adding another distant stop late in the day."
                    ]
                },
                {
                    h: "Bai Dinh: consider setting aside a separate day", p: [
                        "Bai Dinh is considerably farther from Tam Coc than the nearby attractions; a rough estimate may be about 25 km depending on the starting point and route. The large complex can also take longer to explore than expected.",
                        "Consider allocating a substantial half-day or pairing it with a nearby stop instead of packing it into the same day as Tam Coc, Mua Cave and Trang An. Check internal transport, opening times and the return plan before leaving."
                    ]
                },
                {
                    h: "Choose transport for the route and terrain", p: [
                        "A pedal-assist e-bike can suit short, relaxed routes with light luggage. An electric motorbike may be more practical between distant clusters, but the rider must meet current requirements and feel confident handling the vehicle. Confirm the expected range for the specific model rather than relying on one figure for all electric vehicles.",
                        "Before leaving Tam Coc, check the battery, brakes and tyres; save the route offline if mobile coverage may be unreliable. Keep enough battery for the return leg, avoid overloading the vehicle and ask about support if a problem occurs."
                    ]
                },
                {
                    h: "Build a route that leaves room to enjoy the stops", p: [
                        "One practical approach is to group Tam Coc, Bich Dong and Mua Cave; Trang An and Hoa Lu; then choose either Thung Nham or Bai Dinh based on your interests. One or two clusters per day is usually more realistic than racing through a long checklist.",
                        "Travel times vary with traffic, weather and the time spent at each attraction. Before the trip, check opening times, tickets and road conditions, and leave room for a rest, a meal or a change of plan."
                    ]
                }
            ],
            conclusion: "Distance is only one part of the journey. Group attractions by area, allow realistic time on site and choose transport for the full return route. That leaves more of the day for experiencing Ninh Binh and less for rushing between stops."
        }
    }
];

export const rentalGuide = {
    title: "Kinh nghiệm thuê xe máy điện ở Ninh Bình: từ chọn xe đến chuẩn bị hành trình",
    desc: "Cẩm nang thực tế giúp chọn xe, xác nhận giá và giấy tờ, kiểm tra pin cùng lên kế hoạch khám phá Ninh Bình an toàn hơn.",
    date: "2026-10-06",
    modified: "2026-10-15",
    intro: "Thuê xe giúp du khách chủ động hơn giữa những điểm tham quan nằm rải rác quanh Ninh Bình, nhưng sự thuận tiện chỉ có ý nghĩa khi phương tiện phù hợp và điều kiện thuê được hiểu rõ. Trước khi đặt, cần xác định lịch trình, số người đi, loại xe phù hợp và các thông tin phải xác nhận tại nơi cho thuê. Cẩm nang này đi theo đúng trình tự đó để bạn chuẩn bị từ lúc chọn xe cho tới khi kết thúc chuyến đi.",
    sections: [
        {
            h: "Bắt đầu bằng lịch trình, không bắt đầu bằng mẫu xe", p: [
                "Hãy đánh dấu nơi lưu trú, những điểm muốn ghé và thời gian dự kiến ở mỗi nơi. Một lịch quanh Tam Cốc, Bích Động và Hang Múa khác với ngày đi Tràng An hoặc Bái Đính; đừng chỉ nhìn quãng đường một chiều mà quên chặng quay về.",
                "Nếu kế hoạch chủ yếu là những đoạn ngắn, đi chậm và mang ít đồ, xe đạp trợ lực có thể đáp ứng tốt. Khi các điểm cách xa nhau hoặc cần linh hoạt về thời gian, xe máy điện có thể phù hợp hơn. Số người, hành lý và kinh nghiệm điều khiển cũng ảnh hưởng đến lựa chọn."
            ]
        },
        {
            h: "So sánh xe máy điện và xe đạp trợ lực", p: [
                "Xe máy điện thường phù hợp với hành trình rộng hơn và có thể chở người đi cùng theo đúng tải trọng của xe. Xe đạp trợ lực đem lại nhịp di chuyển chậm, dễ dừng ngắm cảnh và phù hợp hơn với quãng ngắn. Hãy hỏi cửa hàng về thông số, giới hạn tải và phạm vi hoạt động của chính mẫu xe dự định nhận.",
                "Không nên chọn xe chỉ theo ảnh hoặc tên gọi. Hãy cân nhắc tư thế ngồi, chiều cao yên, khả năng giữ thăng bằng, cách phanh và mức tự tin của người lái. Nếu chưa quen xe điện, yêu cầu hướng dẫn thao tác ở nơi an toàn trước khi nhập đường đông."
            ]
        },
        {
            h: "Xác nhận giá, giấy tờ và điều kiện thuê", p: [
                "Giá công bố hiện tại tại Xe Cố Đô Xanh là 150.000 đồng/24 giờ cho xe máy điện và 120.000 đồng/24 giờ cho xe đạp trợ lực; gói 5 giờ tương ứng 100.000 và 80.000 đồng. Hãy xác nhận mức giá áp dụng cho ngày thuê, thời điểm bắt đầu/kết thúc và cách tính khi trả muộn hoặc gia hạn.",
                "Hỏi rõ giấy tờ tùy thân cần mang, điều kiện đặt cọc/thanh toán, phụ kiện đi kèm, vị trí giao nhận và đầu mối hỗ trợ. Với yêu cầu bằng lái, căn cứ phải là phân loại và giấy tờ của đúng chiếc xe; đừng suy luận từ tên model hay lời quảng cáo."
            ]
        },
        {
            h: "Kiểm tra xe và pin trước khi rời cửa hàng", p: [
                "Dành vài phút kiểm tra phanh, lốp, đèn, xi-nhan, còi, gương, khóa và chân chống. Chụp lại các vết xước có sẵn, xác nhận phụ kiện bàn giao và hỏi cách xử lý nếu xe báo lỗi hoặc pin xuống thấp. Đây là lúc dễ đổi xe hoặc làm rõ tình trạng nhất.",
                "Hãy hỏi về mức pin thực tế và cách sạc/đổi pin dành cho mẫu xe đó. Phạm vi quảng cáo không phải cam kết trong mọi điều kiện: tải trọng, tốc độ, địa hình và việc dừng/khởi động liên tục đều tác động tới lượng pin tiêu thụ. Lập kế hoạch với phần dự phòng cho đường về."
            ]
        },
        {
            h: "Lên lịch tham quan có khoảng nghỉ", p: [
                "Một ngày có thể bắt đầu bằng Hang Múa vào buổi sáng, nghỉ trưa, sau đó chọn Tràng An hoặc Tam Cốc cho buổi chiều. Chuyến thuyền có thời lượng riêng; hãy dành đủ thời gian và không xếp một điểm xa ngay trước giờ đóng cửa. Nếu trời nóng hoặc đông khách, sẵn sàng bỏ bớt một điểm.",
                "Kiểm tra giờ mở cửa, thông tin vé và thời tiết từ nguồn của điểm tham quan trước ngày đi. Chuẩn bị nước, đồ chống nắng và giày phù hợp; giữ điện thoại có pin để xem đường nhưng không sử dụng khi đang lái."
            ]
        },
        {
            h: "An toàn trên đường và khi trả xe", p: [
                "Đội mũ bảo hiểm, tuân thủ luật giao thông, tốc độ phù hợp và không lái sau khi uống rượu bia. Đi chậm ở đoạn đường lạ, giao lộ và khu dân cư; không chở vượt tải trọng. Nếu xe có biểu hiện bất thường, dừng ở nơi an toàn và liên hệ đơn vị cho thuê thay vì cố đi tiếp.",
                "Khi kết thúc, trả xe đúng thời gian và địa điểm đã thống nhất, bàn giao phụ kiện và kiểm tra lại các khoản thanh toán. Lưu tin nhắn đặt xe và thông tin liên hệ cho tới khi hoàn tất việc trả xe."
            ]
        }
    ],
    conclusion: "Một chuyến thuê xe suôn sẻ thường đến từ những bước nhỏ trước khi khởi hành: lịch trình vừa sức, xe đúng nhu cầu, điều kiện thuê rõ ràng và kiểm tra xe cẩn thận. Xác nhận trực tiếp các thông tin có thể thay đổi như giá, pin, giấy tờ và giờ hoạt động trước mỗi chuyến đi.",
    EN: {
        title: "Renting an Electric Motorbike in Ninh Binh: A Practical Guide from Booking to Return",
        desc: "A practical guide to choosing a vehicle, confirming price and documents, checking the battery and planning a safer Ninh Binh trip.",
        image: "/src/assets/dulich/ninhbinh_slider_1.webp",
        date: "2026-10-06",
        modified: "2026-10-15",
        intro: "A rental vehicle can make it easier to move between Ninh Binh's spread-out attractions, but convenience depends on choosing the right vehicle and understanding the rental terms. Before booking, work out your route, passenger count, vehicle needs and the details to confirm with the provider. This guide follows that order, from choosing a bike to returning it.",
        sections: [
            {
                h: "Start with your route, not a vehicle model", p: [
                    "Mark your accommodation, intended stops and the time you expect to spend at each one. A route around Tam Coc, Bich Dong and Mua Cave differs from a day at Trang An or Bai Dinh; remember to include the return journey, not only the one-way distance.",
                    "A pedal-assist e-bike may suit short, slow rides with light luggage. An electric motorbike may be more practical when stops are farther apart or you need more flexibility. Passenger count, luggage and riding experience also matter."
                ]
            },
            {
                h: "Compare an electric motorbike with a pedal-assist e-bike", p: [
                    "An electric motorbike can suit a wider route and may carry a passenger within the vehicle's rated capacity. A pedal-assist e-bike offers a slower pace, easier scenic stops and can work well over shorter distances. Ask the provider about the specifications, load limit and expected range of the exact model you plan to rent.",
                    "Do not choose from a photo or model name alone. Consider riding position, seat height, balance, braking and the rider's confidence. If you are new to electric vehicles, ask for a safe demonstration before entering busy traffic."
                ]
            },
            {
                h: "Confirm price, documents and rental terms", p: [
                    "Xe Co Do Xanh currently publishes VND 150,000 per 24 hours for electric motorbikes and VND 120,000 per 24 hours for pedal-assist e-bikes; five-hour rentals are VND 100,000 and VND 80,000 respectively. Confirm the rate for your date, the rental start and end times, and how late returns or extensions are charged.",
                    "Ask which identification is required, how deposits and payment work, which accessories are included, where pickup and return take place, and who to contact for help. Licence requirements should be based on the classification and documents of the specific vehicle, not inferred from a model name or advertisement."
                ]
            },
            {
                h: "Check the vehicle and battery before leaving", p: [
                    "Take a few minutes to inspect brakes, tyres, lights, indicators, horn, mirrors, lock and stand. Photograph existing marks, confirm the accessories supplied and ask what to do if a warning appears or the battery runs low. This is the easiest time to request another vehicle or clarify its condition.",
                    "Ask about the actual battery level and the charging or swap procedure for that model. An advertised range is not guaranteed in every condition: load, speed, terrain and frequent stops all affect energy use. Keep a reserve for the return leg."
                ]
            },
            {
                h: "Plan sightseeing with room for breaks", p: [
                    "One option is Mua Cave in the morning, a lunch break, then either Trang An or Tam Coc in the afternoon. Boat trips have their own duration; allow enough time and avoid scheduling a distant stop just before closing. If it is hot or crowded, be ready to drop one attraction.",
                    "Check opening times, ticket information and weather from the attraction operator before travelling. Bring water, sun protection and suitable shoes; keep your phone charged for navigation but do not use it while riding."
                ]
            },
            {
                h: "Ride safely and return the vehicle properly", p: [
                    "Wear a helmet, follow traffic rules and appropriate speed limits, and never ride after drinking alcohol. Slow down on unfamiliar roads, at junctions and in residential areas; do not exceed the vehicle's load limit. If something seems wrong, stop somewhere safe and contact the rental provider instead of continuing.",
                    "At the end of the rental, return the vehicle at the agreed time and location, hand back the accessories and settle any outstanding charges. Keep your booking messages and provider contact details until the return is complete."
                ]
            }
        ],
        conclusion: "A smooth rental often comes down to small steps before departure: a manageable itinerary, a suitable vehicle, clear terms and a careful handover check. Confirm changeable details such as price, battery arrangements, documents and opening times directly before each trip."
    }
};
