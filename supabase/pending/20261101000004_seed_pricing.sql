-- Generated from frontend/src/data/pricing.json. Validated by the pricing_before_write trigger.
insert into public.pricing (id, data) values (1, $seed${
  "rateCards": {
    "griha-pravesh": {
      "serviceId": "griha-pravesh",
      "serviceName": {
        "en": "Griha Pravesh Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "local-project-data",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Indicative starting dakshina (Preserved local project data)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 to 3.5 hrs foundational home entry ritual. High demand across Pune & metro hubs.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara packages range from ₹3,600 to ₹12,800. ₹3,500/₹5,500 is standard for North Indian home ritual in Pune.",
      "missingBusinessInfo": "Commercial sign-off on ₹3,500 (Dakshina only) vs ₹5,500 (with Hawan Samagri kit).",
      "packages": [
        {
          "id": "gp-dakshina",
          "name": {
            "en": "Package A — Ritual Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist provided in advance (devotee arranges materials)",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee arranges hawan samagri and cow ghee",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh flowers, fruits, milk & prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee provides household puja thali & vessels",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gp-samagri",
          "name": {
            "en": "Package B — Ritual + Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure desi cow ghee & sacred hawan wood included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee only prepares fresh flowers & seasonal fruits",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh milk, curd & household utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "satyanarayan-puja": {
      "serviceId": "satyanarayan-puja",
      "serviceName": {
        "en": "Satyanarayan Puja & Katha",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "local-project-data",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Indicative starting dakshina (Preserved local project data)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 to 2.5 hrs devotional monthly/milestone ceremony. Most frequent home puja.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Satyanarayan ranges from ₹3,000 to ₹6,500. VedicPanditji local rate ₹2,500/₹3,800 is highly competitive.",
      "missingBusinessInfo": "Confirmation whether Katha with Hawan includes standard cow ghee in Package B.",
      "packages": [
        {
          "id": "sn-dakshina",
          "name": {
            "en": "Package A — Ritual Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for 5-chapter Katha & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist provided in advance (devotee arranges materials)",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee arranges hawan samagri, cow ghee & dry fruits",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee prepares Panchamrit, bananas, fresh flowers & prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee provides household chowki & thalis",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "sn-samagri",
          "name": {
            "en": "Package B — Ritual + Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for 5-chapter Katha & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure cow ghee & dry ritual samagri included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee prepares fresh flowers, bananas & Sheera (Prasad)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee prepares fresh Panchamrit (milk, curd, honey, sugar, tulsi)",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "vastu-shanti-puja": {
      "serviceId": "vastu-shanti-puja",
      "serviceName": {
        "en": "Vastu Shanti Puja & Havan",
        "hi": "",
        "mr": ""
      },
      "category": "shanti-pujas",
      "model": "package-pricing",
      "approvalStatus": "local-project-data",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Indicative starting dakshina (Preserved local project data)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3 to 4 hrs architectural pacification and Agnihotra hawan for flats/plots.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Vastu Homam packages range from ₹4,500 to ₹14,000.",
      "missingBusinessInfo": "Whether copper Vastu Yantra is provided by VedicPanditji or devotee.",
      "packages": [
        {
          "id": "vs-dakshina",
          "name": {
            "en": "Package A — Ritual Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Vastu Shanti Vidhi & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist provided in advance (devotee arranges materials)",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee arranges hawan samagri and cow ghee",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh flowers, fruits & prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee provides copper kalash & household utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "vs-samagri",
          "name": {
            "en": "Package B — Ritual + Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Vastu Shanti Vidhi & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure desi cow ghee & hawan kashtha included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee prepares fresh flowers, water coconut & seasonal fruits",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh milk & curd",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "rudrabhishek-puja": {
      "serviceId": "rudrabhishek-puja",
      "serviceName": {
        "en": "Rudrabhishek Puja & Shivling Abhishek",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "local-project-data",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Indicative starting dakshina (Preserved local project data)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 to 3 hrs Namakam/Chamakam chanting with 11-substance abhishek.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Rudra Abhishek ranges from ₹3,500 to ₹8,500 in Maharashtra.",
      "missingBusinessInfo": "Whether Panditji brings a Narmadeshwar Shivling for households lacking one.",
      "packages": [
        {
          "id": "rb-dakshina",
          "name": {
            "en": "Package A — Ritual Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Rudri Path & Abhishek",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist provided in advance (devotee arranges materials)",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee arranges fresh raw milk, gangajal, honey, curd & sugarcane juice",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh Belpatra, Dhatura, flowers & prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges Shivling & abhishek patra",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "rb-samagri",
          "name": {
            "en": "Package B — Ritual + Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Indicative starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Rudri Path & Abhishek",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan & Abhishek dry samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred Bhasma, Chandan, Janeu & Havan wood included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja performed as per agreed Shastra vidhi",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee arranges fresh milk, curd, honey & panchamrit liquids",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devotee arranges fresh Belpatra, Dhatura & flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "bhoomi-puja": {
      "serviceId": "bhoomi-puja",
      "serviceName": {
        "en": "Bhoomi Puja (Plot Groundbreaking)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 to 3 hrs plot foundation ritual with Ashta Dikpala and Kurma sthapana.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Bhoomi Puja ranges from ₹3,600 to ₹12,800. ₹3,100/₹4,800 is an honest starting structure.",
      "missingBusinessInfo": "Whether copper Kurma/Naga or foundation bricks are arranged by Panditji.",
      "packages": [
        {
          "id": "bp-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Vedic Acharya for Bhoomi Pujan & Sankalp",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Dikpal & Vastu Purush invocation on plot",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Detailed foundation samagri checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh flowers, fruits, coconuts",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Foundation digging tools",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "bp-standard",
          "name": {
            "en": "Standard — Ritual + Essential Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Vedic Acharya for Bhoomi Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit, Navadhanya & Copper Kalash included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Desi cow ghee & sacred mango wood included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Full ground sanctification vidhi",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, loose marigold garlands",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Household thali & digging shovel",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "office-opening-puja": {
      "serviceId": "office-opening-puja",
      "serviceName": {
        "en": "Office Opening & Vyapar Vriddhi Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs commercial sanctification, Gauri-Ganesh, Navagraha and Kuber-Laxmi sthapana.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Office Opening ranges from ₹4,300 to ₹9,800. ₹3,100/₹4,800 is competitive for commercial units.",
      "missingBusinessInfo": "Whether smoke-free Agnihotra kund is provided for air-conditioned office spaces.",
      "packages": [
        {
          "id": "oo-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Pandit for Office Opening Vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gauri-Ganesh, Navagraha & Vyapar Vriddhi Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Office samagri checklist provided in advance",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Hawan samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Cash counter toran & fresh flowers",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Puja utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "oo-standard",
          "name": {
            "en": "Standard — Ritual + Business Samagri Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Recommended for Workspaces",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Pandit for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Toran, Roli, Akshat, Janeu, Dhoop & Camphor included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Smoke-conscious Agnihotra vidhi for commercial premises",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, coconut, sweets (Mithai) for staff",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "mahalaxmi-puja": {
      "serviceId": "mahalaxmi-puja",
      "serviceName": {
        "en": "Mahalaxmi Puja & Kanakdhara Vidhi",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs home wealth worship with Kanakdhara Stotra and Sri Sukta ahutis.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Mahalaxmi Puja ranges from ₹3,800 to ₹7,500.",
      "missingBusinessInfo": "Whether silver Lakshmi coin consecration is included in standard package.",
      "packages": [
        {
          "id": "mlx-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Mahalaxmi Pujan & Kanakdhara Path",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ashtalakshmi invocation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Lotus flowers & fresh sweets",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "mlx-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure cow ghee & Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kamalgatta (lotus seeds) & sacred herbs included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh lotus flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "saraswati-puja": {
      "serviceId": "saraswati-puja",
      "serviceName": {
        "en": "Saraswati Puja for Education & Wisdom",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3500,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 to 2 hrs ceremony for students, intellect, and books/instrument blessing.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Saraswati Puja ranges from ₹3,500 to ₹6,500.",
      "missingBusinessInfo": "Book and pen blessing guidance.",
      "packages": [
        {
          "id": "srs-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Saraswati Aradhana & Medha Sukta",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Vidya Aarambh blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "White flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "srs-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Saraswati hawan kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Chandan & yellow akshat",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh white flowers, pens, notebooks",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "ganesh-sthapana-visarjan": {
      "serviceId": "ganesh-sthapana-visarjan",
      "serviceName": {
        "en": "Ganesh Sthapana & Visarjan Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 hrs single session (Sthapana) or two-session package (Sthapana + Visarjan).",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Ganesh festival packages range from ₹2,500 to ₹6,500.",
      "missingBusinessInfo": "Single session vs two-visit bundle pricing.",
      "packages": [
        {
          "id": "gs-single",
          "name": {
            "en": "Basic — Sthapana Session Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Single Session",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Praan Pratishtha & Ganesh Sthapana",
              "hi": "",
              "mr": ""
            },
            {
              "en": "108 Durva Archana",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh Modaks & flowers",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Visarjan visit",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gs-bundle",
          "name": {
            "en": "Standard — Sthapana + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Sthapana & Hawan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Moli, Janeu, Kalash vastram included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh modaks and red hibiscus flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "annaprashan-puja": {
      "serviceId": "annaprashan-puja",
      "serviceName": {
        "en": "Annaprashan Puja (First Rice Feeding)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs child sanskar with Ayush homam and first solid food tasting.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Annaprashan packages range from ₹4,500 to ₹8,500.",
      "missingBusinessInfo": "Whether silver spoon / katori is devotee-supplied.",
      "packages": [
        {
          "id": "ap-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Annaprashan Vidhi & Ayush blessings",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Tray-testing ritual guidance",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Cooked Kheer/Payasam",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ap-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kalash, gangajal, roli, moli",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, kheer, baby silver katori",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "mundan-or-chudakarana-ceremony": {
      "serviceId": "mundan-or-chudakarana-ceremony",
      "serviceName": {
        "en": "Mundan (Chudakarana) Sanskar",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs child head-shaving ritual, Gauri-Ganesh pujan and Ayush hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Chudakarana ranges from ₹4,500 to ₹9,500.",
      "missingBusinessInfo": "Barber service coordination (typically arranged by family).",
      "packages": [
        {
          "id": "mn-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Chudakarana Vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kusha grass cutting ritual",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ayush hawan vidhi & checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Barber services",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh items",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "mn-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Samagri Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kusha grass, chandan, haldi paste for baby scalp",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Barber / Nai fees",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "namkaran-puja": {
      "serviceId": "namkaran-puja",
      "serviceName": {
        "en": "Namkaran Puja (Vedic Naming Ceremony)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 to 2 hrs ceremony; birth nakshatra letter calculation and formal whisper.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Namkaran ranges from ₹4,800 to ₹15,800.",
      "missingBusinessInfo": "Whether horoscope chart generation is bundled.",
      "packages": [
        {
          "id": "nk-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Namkaran Sanskar",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Nakshatra name selection guidance",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bronze plate & raw rice",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "nk-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred honey for ear-whisper ritual, roli, moli",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, sweets & baby cradle decoration",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "godh-bharai-puja-baby-shower": {
      "serviceId": "godh-bharai-puja-baby-shower",
      "serviceName": {
        "en": "Godh Bharai & Punsavan Sanskar",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs motherhood blessing, Simantonayana Vedic rites, and lap-filling blessing.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Godh Bharai / Seemantham ranges from ₹4,500 to ₹8,500.",
      "missingBusinessInfo": "Green bangles and lap fruit basket arrangements.",
      "packages": [
        {
          "id": "gb-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Punsavan / Simantonayana Vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gauri Pujan & Mother Blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Lap-filling dry fruits & sari",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gb-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Chandan, Kalash vastram & sacred thread",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh green bangles, fruits, coconuts",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "yagnopavit-sanskar": {
      "serviceId": "yagnopavit-sanskar",
      "serviceName": {
        "en": "Yagnopavit Sanskar (Upanayan / Janeu)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 4500,
      "maxPrice": 8500,
      "startingPriceDisplay": "From ₹4,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3 to 4 hrs sacred thread investiture, Brahmacharya sankalp, Gayatri Diksha, and Bhiksha vidhi.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Upanayanam ranges from ₹8,500 to ₹35,000.",
      "missingBusinessInfo": "Whether 1 or 2 Pandits are standard for North Indian Upanayan.",
      "packages": [
        {
          "id": "yp-basic",
          "name": {
            "en": "Basic — Single Acharya Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4500,
          "priceDisplay": "₹4,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Vedic Acharya for complete Upanayan & Gayatri Diksha",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bhiksha ceremony guidance",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Detailed Janeu checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Yagnopaveetam thread sets",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmachari danda & vastram",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "yp-standard",
          "name": {
            "en": "Standard — Acharya + Full Samagri Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 6500,
          "priceDisplay": "₹6,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Vedic Acharya for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Upanayan Hawan kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Consecrated Yagnopaveetam (Janeu) sets & sacred thread included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Munj grass belt (Mekhala) & Palash danda blessing",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, dhoti for boy, maternal uncle gifts",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        },
        {
          "id": "yp-premium",
          "name": {
            "en": "Premium — 2 Acharyas + Extended Setup",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Complete Family Sanskar",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 8500,
          "priceDisplay": "₹8,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Senior Vedic Acharyas conducting simultaneous Veda chanting and Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete pure Samagri box with A2 Gir cow ghee",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Consecrated Janeu sets for boy and family male members",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Full Gayatri Anushthan sankalp",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, Brahmin bhojan dakshina",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "shuddhikaran-puja": {
      "serviceId": "shuddhikaran-puja",
      "serviceName": {
        "en": "Shuddhikaran Puja (House Purification)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3200,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 hrs purification after birth/death/renovations with Panchagavya and hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Shuddhikaran ranges from ₹3,200 to ₹5,500.",
      "missingBusinessInfo": "Sourcing of Panchagavya elements.",
      "packages": [
        {
          "id": "sk-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Shuddhi Sankalp & Chanting",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Panchagavya purification sprinklings",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh cow milk, curd, gangajal",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "sk-standard",
          "name": {
            "en": "Standard — Ritual + Purification Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3200,
          "priceDisplay": "₹3,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential herbal purification hawan kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gomutra & Gangajal included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers & prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "brihaspati-vrat-udyapan-puja": {
      "serviceId": "brihaspati-vrat-udyapan-puja",
      "serviceName": {
        "en": "Brihaspati Vrat Udyapan Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs conclusion of 16 Thursday fasts for Lord Brihaspati / Vishnu.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Udyapan packages range from ₹3,500 to ₹6,500.",
      "missingBusinessInfo": "Yellow gram dal and banana plant arrangement.",
      "packages": [
        {
          "id": "bv-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Udyapan Katha & Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Guru Yantra invocation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Yellow cloth, chana dal, bananas",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "bv-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Yellow cloth, turmeric root & sacred threads",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh bananas and yellow gram sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "solah-somvar-udyapan-puja": {
      "serviceId": "solah-somvar-udyapan-puja",
      "serviceName": {
        "en": "Solah Somvar Udyapan Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs conclusion of 16 Monday fasts for Lord Shiva with abhishek & hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Somvar Udyapan ranges from ₹3,500 to ₹6,500.",
      "missingBusinessInfo": "Prasad (Baati / Churma) devotee preparation.",
      "packages": [
        {
          "id": "ss-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Somvar Katha & Abhishek",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Lord Shiva archana",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Belpatra, raw milk, prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ss-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bhasma, Chandan, Janeu, Dhoop & Camphor",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh milk, curd, honey & Churma prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "ekadashi-vrat-udyapan-puja": {
      "serviceId": "ekadashi-vrat-udyapan-puja",
      "serviceName": {
        "en": "Ekadashi Vrat Udyapan Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs conclusion of Ekadashi fasts dedicated to Lord Vishnu with Hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Ekadashi Udyapan ranges from ₹3,500 to ₹6,500.",
      "missingBusinessInfo": "Number of Brahmins for Bhojan / Dakshina.",
      "packages": [
        {
          "id": "ek-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Ekadashi Mahatmya Katha",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Vishnu Sahasranam Path & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Tulsi dal, fresh fruits, prasad",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ek-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Purna Kalash items, Roli, Akshat, Janeu",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, Tulsi leaves, prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "kuber-upasana-puja": {
      "serviceId": "kuber-upasana-puja",
      "serviceName": {
        "en": "Kuber Upasana Puja for Wealth & Trade",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs ritual for trade growth, treasury abundance, and business recovery.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Kuber Puja ranges from ₹3,800 to ₹7,500.",
      "missingBusinessInfo": "Whether copper Kuber Yantra is gifted to customer.",
      "packages": [
        {
          "id": "ku-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Kuber Pujan & Dhana Akarshana Mantras",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Locker & Cashbox blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Dry fruits, sweets, coins",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ku-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Lotus seeds (Kamalgatta) & sacred herbs included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers and sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "vishwakarma-puja": {
      "serviceId": "vishwakarma-puja",
      "serviceName": {
        "en": "Vishwakarma Puja (Machinery & Tools)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3500,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 to 2 hrs ceremony for workshops, factories, IT servers, and tools.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Vishwakarma Puja ranges from ₹3,500 to ₹7,000.",
      "missingBusinessInfo": "Large industrial scale surcharge, if applicable.",
      "packages": [
        {
          "id": "vk-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Vishwakarma Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Machinery & tool blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Red cloths, sweets for workers",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "vk-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Moli, Janeu, Kalash items",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh marigold garlands & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "new-vehicle-puja": {
      "serviceId": "new-vehicle-puja",
      "serviceName": {
        "en": "New Vehicle Puja (Vahan Puja)",
        "hi": "",
        "mr": ""
      },
      "category": "pujas",
      "model": "fixed-price",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 1100,
      "maxPrice": 1800,
      "startingPriceDisplay": "₹1,100",
      "pricingNote": {
        "en": "Proposed fixed dakshina (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "45 mins to 1 hr focused vehicle blessing and obstacle warding.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Vehicle Puja ranges from ₹1,500 to ₹3,500. ₹1,100 is an honest doorstep dakshina.",
      "missingBusinessInfo": "Whether 2-wheelers and 4-wheelers have different rates.",
      "packages": [
        {
          "id": "vp-standard",
          "name": {
            "en": "Standard Vehicle Blessing",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Standard Service",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 1100,
          "priceDisplay": "₹1,100",
          "priceNote": {
            "en": "Fixed standard dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Pandit arriving at your doorstep or apartment parking",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Gauri-Ganesh Pujan & Swastika consecration",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Coconut breaking (Balidana) & 4-tyre lemon crushing vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred protective thread (Moli) tied to steering wheel",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee provides 4 fresh lemons, 1 coconut, small sweets, and agarbatti",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "vp-with-samagri",
          "name": {
            "en": "Doorstep All-Inclusive Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "All Materials Included",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 1800,
          "priceDisplay": "₹1,800",
          "priceNote": {
            "en": "Complete kit included",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete vehicle blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh lemons, sacred coconut, camphor, roli, and moli provided by Panditji",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Auspicious copper Kalash water sanctification",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Sweets / Prasad distribution",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        }
      ]
    },
    "ganapathi-havan": {
      "serviceId": "ganapathi-havan",
      "serviceName": {
        "en": "Maha Ganapathi Havan",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 4200,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs primary obstacle-removal Agnihotra fire ritual.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Ganapathi Homam starts at ₹5,000 for standard tier.",
      "missingBusinessInfo": "108 Modak ahuti requirements.",
      "packages": [
        {
          "id": "gh-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Ganapathi Homam & 108 Ahutis",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Shodashopachara Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Modaks, fresh flowers, cow ghee",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Hawan kund",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gh-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4200,
          "priceDisplay": "₹4,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential herbal Hawan Samagri kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred mango wood (kashtha) & camphor included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, modaks & loose flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "navagraha-havan": {
      "serviceId": "navagraha-havan",
      "serviceName": {
        "en": "Navagraha Shanti Havan",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 to 3 hrs fire ceremony pacifying all 9 planetary grahas with 9 specific sacred woods.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Navagraha Homam ranges from ₹5,000 to ₹35,000.",
      "missingBusinessInfo": "Procurement of all 9 specialized Navagraha samidhas.",
      "packages": [
        {
          "id": "nh-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for 9-graha invocation & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Navagraha Mandala Pujan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9 graha cloths & samidha wood",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "nh-standard",
          "name": {
            "en": "Standard — Ritual + Full Navagraha Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9 Navagraha Samidha woods (Arka to Kusha) & 9 colored cloths included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Navadhanya & Purna Kalash vastram",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, fruits, milk",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "chandi-havan": {
      "serviceId": "chandi-havan",
      "serviceName": {
        "en": "Maha Chandi Havan & Durga Saptashati",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 7500,
      "maxPrice": 18500,
      "startingPriceDisplay": "From ₹7,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "4 to 5 hrs intensive ceremony requiring multiple senior reciters for 700 verses & vast ahutis.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Chandi Homam ranges from ₹32,400 to ₹106,500.",
      "missingBusinessInfo": "Number of Brahmins (2 or 3) and Kanya Puja gifts.",
      "packages": [
        {
          "id": "ch-basic",
          "name": {
            "en": "Basic — 2 Acharyas Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "2 Vedic Acharyas",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 7500,
          "priceDisplay": "₹7,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Senior Vedic Acharyas for complete 700 Saptashati verses & Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kanya Puja items",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee & fruits",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ch-standard",
          "name": {
            "en": "Standard — 2 Acharyas + Complete Chandi Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 12500,
          "priceDisplay": "₹12,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Senior Vedic Acharyas for full ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Chandi Hawan Samagri box with pure cow ghee & sacred herbs",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Red silk cloth for Devi, Kamal gatta, dry fruits & Navarna ahutis",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, red saree for Devi, Kanya pujan dakshina",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        },
        {
          "id": "ch-premium",
          "name": {
            "en": "Premium — 3 Acharyas + Full Navachandi Setup",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Grand Ceremony",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 18500,
          "priceDisplay": "₹18,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3 Senior Vedic Acharyas conducting synchronized recitation & Maha Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Full Navachandi Samagri setup with A2 Gir cow ghee & rare herbs",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Kanya Puja coordination & gifts",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Brahmin bhojan feast",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "mrityunjaya-havan": {
      "serviceId": "mrityunjaya-havan",
      "serviceName": {
        "en": "Maha Mrityunjaya Havan for Longevity",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 to 3.5 hrs fire ceremony with Amrita herbs for health recovery and vitality.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Mrityunjaya Homam ranges from ₹6,500 to ₹28,000.",
      "missingBusinessInfo": "Sourcing of fresh Giloy / Amrita sticks.",
      "packages": [
        {
          "id": "mj-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya Dakshina for Mrityunjaya Havan & 1008 Ahutis",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Giloy / Amrita herbs",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "mj-standard",
          "name": {
            "en": "Standard — Ritual + Amrita Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Medicinal herbs (Giloy, Durva, Guggul) & wood",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, milk & flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "ayush-havan": {
      "serviceId": "ayush-havan",
      "serviceName": {
        "en": "Ayush Havan (Birthday & Long Life)",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 4200,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs vitality and birthday fire ceremony for children or seniors.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Ayush Homam ranges from ₹4,500 to ₹12,500.",
      "missingBusinessInfo": "Payasam preparation instructions.",
      "packages": [
        {
          "id": "ay-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Ayush Homa & Markandeya invocation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee, payasam, flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ay-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4200,
          "priceDisplay": "₹4,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Mango wood, camphor, roli, moli",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits & birthday payasam/kheer",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "dhanvantri-havan": {
      "serviceId": "dhanvantri-havan",
      "serviceName": {
        "en": "Dhanvantri Havan for Chronic Healing",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 4200,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs medicinal fire ceremony for physical ailments and surgery recovery.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Dhanvantri Homam ranges from ₹5,000 to ₹15,000.",
      "missingBusinessInfo": "Ayurvedic herb packet sourcing.",
      "packages": [
        {
          "id": "dh-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Dhanvantri invocation & Arogya Sankalp",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Medicinal herbs",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "dh-standard",
          "name": {
            "en": "Standard — Ritual + Healing Herbs Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4200,
          "priceDisplay": "₹4,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit with 54 Ayurvedic herbs included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure cow ghee & sacred wood",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, milk, flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "rudra-havan": {
      "serviceId": "rudra-havan",
      "serviceName": {
        "en": "Rudra Havan (Shiva Fire Ceremony)",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3 hrs intense Shiva fire ceremony with Namakam/Chamakam chanting.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Rudra Homam ranges from ₹6,000 to ₹22,000.",
      "missingBusinessInfo": "Whether coupled with Shivling Abhishek.",
      "packages": [
        {
          "id": "rh-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya Dakshina for Rudra Path & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Belpatra, ghee, dravyas",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "rh-standard",
          "name": {
            "en": "Standard — Ritual + Shiva Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred Bhasma, Chandan, Janeu, Bilva ahutis",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh milk, curd, honey & belpatra",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "gayatri-havan": {
      "serviceId": "gayatri-havan",
      "serviceName": {
        "en": "Gayatri Havan (Solar Vedic Purification)",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 4200,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs universal purification with 108 or 1008 Savitur Gayatri ahutis.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Gayatri Homam ranges from ₹4,500 to ₹14,000.",
      "missingBusinessInfo": "Ahuti count confirmation.",
      "packages": [
        {
          "id": "gy-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Gayatri Japa & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Surya Aradhana & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee & wood",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gy-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4200,
          "priceDisplay": "₹4,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred wood, camphor, roli, moli",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers & prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "laxmi-kubera-havan": {
      "serviceId": "laxmi-kubera-havan",
      "serviceName": {
        "en": "Laxmi Kubera Havan for Prosperity",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs wealth fire ritual with lotus seeds and Sri Sukta.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Lakshmi Kubera Homam ranges from ₹5,500 to ₹18,000.",
      "missingBusinessInfo": "Lotus seed count.",
      "packages": [
        {
          "id": "lk-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Laxmi Kubera Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ashtalakshmi Pujan & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kamalgatta, ghee, flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "lk-standard",
          "name": {
            "en": "Standard — Ritual + Wealth Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kamalgatta, Bilva fruits & sacred wood",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh lotus flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "sudarshan-havan": {
      "serviceId": "sudarshan-havan",
      "serviceName": {
        "en": "Sudarshan Havan for Supreme Protection",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs Vaishnava protection ritual against evil eye and negative energies.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Sudarshana Homam ranges from ₹5,500 to ₹20,000.",
      "missingBusinessInfo": "Vaishnava priest preference.",
      "packages": [
        {
          "id": "sd-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Sudarshan Chakra invocation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Raksha Kavach chanting & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee, wood, flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "sd-standard",
          "name": {
            "en": "Standard — Ritual + Protection Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Consecrated Sudarshan Yantra, sacred wood, camphor",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers & prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "sri-sukta-havan": {
      "serviceId": "sri-sukta-havan",
      "serviceName": {
        "en": "Sri Sukta Havan (Rigvedic Devi Invocation)",
        "hi": "",
        "mr": ""
      },
      "category": "havans",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 4200,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs Rigvedic recitation of 16 Sri Suktam verses with ahutis.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Sri Suktam ranges from ₹4,500 to ₹15,000.",
      "missingBusinessInfo": "Kheer ahuti instructions.",
      "packages": [
        {
          "id": "sks-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Sri Suktam Path & Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devi Mahalakshmi archana & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee, lotus seeds, sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "sks-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4200,
          "priceDisplay": "₹4,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kamalgatta, sacred wood, roli, moli",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh lotus flowers & kheer",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "maha-mrityunjaya-jaap": {
      "serviceId": "maha-mrityunjaya-jaap",
      "serviceName": {
        "en": "Maha Mrityunjaya Jaap",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 8500,
      "maxPrice": 45000,
      "startingPriceDisplay": "From ₹8,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "Multi-Brahmin japa anushthan with counter malas and concluding hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Mrityunjaya Jaap ranges from ₹12,000 to ₹85,000+ depending on chant count.",
      "missingBusinessInfo": "Number of Pandits and chant count selection in booking flow.",
      "packages": [
        {
          "id": "mmj-11k",
          "name": {
            "en": "11,000 Chants — 1 Day Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "3 Vedic Pandits",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 8500,
          "priceDisplay": "₹8,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3 Vedic Pandits for 11,000 counts + Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sankalp with Gotra",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmin bhojan feast",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "mmj-21k",
          "name": {
            "en": "21,000 Chants — 2 Days / 5 Pandits",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 15500,
          "priceDisplay": "₹15,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "5 Vedic Pandits completing 21,000 chants",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Concluding Hawan kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete daily Sankalp",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Brahmin bhojan feast",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        },
        {
          "id": "mmj-125k",
          "name": {
            "en": "1,25,000 Chants — Maha Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Complete Maha Anushthan",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 45000,
          "priceDisplay": "₹45,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Team of 5-7 Acharyas across multiple days",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Dashansh Havan, Tarpan, Marjan & Brahmin Bhojan coordination",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee accommodation for pandits if outstation",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "gayatri-mantra-jaap": {
      "serviceId": "gayatri-mantra-jaap",
      "serviceName": {
        "en": "Gayatri Mantra Anushthan & Jaap",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 9500,
      "maxPrice": 18500,
      "startingPriceDisplay": "From ₹9,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "24,000 chants over 3 to 5 days with concluding hawan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Gayatri Jaap ranges from ₹15,000 to ₹50,000.",
      "missingBusinessInfo": "Devotee participation requirements.",
      "packages": [
        {
          "id": "gmj-24k",
          "name": {
            "en": "24,000 Chants — 3 Days Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "2 Vedic Pandits",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 9500,
          "priceDisplay": "₹9,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Pandits for 24,000 Gayatri counts + concluding Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gmj-51k",
          "name": {
            "en": "51,000 Chants — 5 Days Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 18500,
          "priceDisplay": "₹18,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3 Pandits for 51,000 counts",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Concluding Hawan kit & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Surya Yantra blessing",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "santan-gopal-mantra-jaap": {
      "serviceId": "santan-gopal-mantra-jaap",
      "serviceName": {
        "en": "Santan Gopal Mantra Jaap for Child Blessings",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 7500,
      "maxPrice": 14500,
      "startingPriceDisplay": "From ₹7,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "11,000 chants dedicated to Lord Krishna for fertility and progeny blessing.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Santan Gopal ranges from ₹11,000 to ₹35,000.",
      "missingBusinessInfo": "Bal Gopal silver idol provision.",
      "packages": [
        {
          "id": "sg-11k",
          "name": {
            "en": "11,000 Chants — Dedicated Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "2 Vedic Pandits",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 7500,
          "priceDisplay": "₹7,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Pandits for 11,000 chants + concluding Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bal Gopal Pujan & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Butter/Misri & fruits",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "sg-21k",
          "name": {
            "en": "21,000 Chants — Extended Anushthan",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 14500,
          "priceDisplay": "₹14,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3 Pandits for 21,000 chants over 3 days",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Hawan kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Maha Abhishek & Gopal Yantra",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "navagraha-graha-shanti-jaap": {
      "serviceId": "navagraha-graha-shanti-jaap",
      "serviceName": {
        "en": "Navagraha Graha Shanti Jaap (Surya to Ketu)",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 6500,
      "maxPrice": 12500,
      "startingPriceDisplay": "From ₹6,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "Targeted japa across malefic planets with concluding Navagraha homa.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Graha Japa ranges from ₹9,000 to ₹35,000.",
      "missingBusinessInfo": "Kundali review prior to japa allocation.",
      "packages": [
        {
          "id": "ngj-basic",
          "name": {
            "en": "Basic — Targeted Dosha Jaap",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Targeted Grahas",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 6500,
          "priceDisplay": "₹6,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Pandits chanting 7,000 to 10,000 counts on afflicted planets + Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9 graha cloths & grains",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ngj-full",
          "name": {
            "en": "Standard — Complete 9 Grahas Japa + Homa Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Full Navagraha Shanti",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 12500,
          "priceDisplay": "₹12,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3 Pandits completing 19,000+ chants across all 9 grahas",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Hawan kit & 9 samidhas included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Graha Daan guidance",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "kaal-sarp-dosh-puja": {
      "serviceId": "kaal-sarp-dosh-puja",
      "serviceName": {
        "en": "Kaal Sarp Dosh Nivaran Puja",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3 hrs Rahu-Ketu pacification with silver Nag-Nagin pair and Rudra pujan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Kaal Sarp ranges from ₹5,500 to ₹18,500 (Trimbakeshwar).",
      "missingBusinessInfo": "Home doorstep vidhi vs Trimbakeshwar kshetra booking.",
      "packages": [
        {
          "id": "ks-doorstep",
          "name": {
            "en": "Basic — Doorstep Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "At Devotee Home",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Kaal Sarp Shanti & Rahu-Ketu Japa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Rudra Abhishek & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Silver Nag-Nagin pair",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Black/Blue cloth",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "ks-complete",
          "name": {
            "en": "Standard — Doorstep + Full Kit with Silver Naga",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Consecrated Silver Nag-Nagin pair & Rahu-Ketu samidhas included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, milk, lead/urad daal for donation",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "gand-mool-nakshatra-shanti-puja": {
      "serviceId": "gand-mool-nakshatra-shanti-puja",
      "serviceName": {
        "en": "Gand Mool Nakshatra Shanti Puja",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3 hrs ritual on 27th day after birth for child born in Gand Mool nakshatra.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Gand Mool ranges from ₹5,000 to ₹12,000.",
      "missingBusinessInfo": "Sourcing 27 tree leaves & 27 water samples in Pune.",
      "packages": [
        {
          "id": "gm-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Gand Mool Shanti & Nakshatra Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Father-Child shadow-seeing guidance",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "27 leaves, 27 waters",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bronze thali",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gm-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Mool Nakshatra herbs & sacred wood included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh leaves, water samples, bronze thali with ghee for reflection",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "guru-chandal-yoga-shanti": {
      "serviceId": "guru-chandal-yoga-shanti",
      "serviceName": {
        "en": "Guru Chandal Yoga Shanti Puja",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs remedy for Jupiter-Rahu conjunction in birth chart.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Chandal Yoga Shanti ranges from ₹4,500 to ₹9,500.",
      "missingBusinessInfo": "Horoscope verification before puja.",
      "packages": [
        {
          "id": "gc-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Brihaspati & Rahu Japa + Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Yellow cloth, chana dal, urad dal",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gc-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Guru-Rahu specific samidhas & cloths",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "grahan-yog-shanti-puja": {
      "serviceId": "grahan-yog-shanti-puja",
      "serviceName": {
        "en": "Grahan Yog Shanti Puja (Surya/Chandra Rahu)",
        "hi": "",
        "mr": ""
      },
      "category": "jaaps",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs remedy for Sun-Rahu / Moon-Rahu eclipse dosha.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Grahan Dosh ranges from ₹4,500 to ₹9,500.",
      "missingBusinessInfo": "Silver plate shadow vision requirements.",
      "packages": [
        {
          "id": "gy-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Surya/Chandra & Rahu Japa + Havan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Silver shadow-vision plate",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gy-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Grahan Shanti samidhas & cloths",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers & milk",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "sunderkand-path": {
      "serviceId": "sunderkand-path",
      "serviceName": {
        "en": "Sunderkand Path Recitation with Music",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 7500,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 to 3.5 hrs musical or solo recitation of 5th book of Ramcharitmanas.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Sunderkand Path is listed around ₹5,800 for musical format.",
      "missingBusinessInfo": "Solo reciter vs 2-3 artist musical troupe tier.",
      "packages": [
        {
          "id": "skp-solo",
          "name": {
            "en": "Solo Reciter — Classical Recitation",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Single Pandit",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Pandit for complete Sunderkand Recitation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Hanuman Chalisa, Sankat Mochan & Aarti",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Musical instruments / Dholak",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "skp-musical",
          "name": {
            "en": "Musical Recitation — Pandit + Musician",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5100,
          "priceDisplay": "₹5,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Lead Pandit Reciter + Dholak/Harmonium Musician",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Sunderkand Samagri kit & Sindoor included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Hanuman Bahuk, Bajrang Baan & Maha Aarti with Dholak",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, boondi / laddu prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-complete-kit"
          ]
        },
        {
          "id": "skp-troupe",
          "name": {
            "en": "Grand Sangeet Path — 3 Devotional Reciters",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Devotional Reciters",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 7500,
          "priceDisplay": "₹7,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "3-Member Devotional Recital Group (Lead Reciter, Harmonium, Dholak accompaniment)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Hawan & Pujan Samagri included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Extended devotional Bhajans & Grand Hanuman Aarti",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Large sound system if beyond apartment size",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "akhand-ramayan-path": {
      "serviceId": "akhand-ramayan-path",
      "serviceName": {
        "en": "Akhand Ramayan Path (24-Hour Continuous)",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 21000,
      "maxPrice": 35000,
      "startingPriceDisplay": "From ₹21,000*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "24 hours continuous non-stop recital requiring team of 4-5 rotating Pandits.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Akhand Ramayan ranges from ₹26,300 to ₹48,800.",
      "missingBusinessInfo": "Overnight rest accommodation for rotating priests at customer venue.",
      "packages": [
        {
          "id": "arp-basic",
          "name": {
            "en": "Basic — 4 Pandits Dakshina Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "4 Rotating Pandits",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 21000,
          "priceDisplay": "₹21,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Team of 4 Pandits reciting 24-hr continuous Ramcharitmanas",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Opening & Closing Havan guidance",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Akhand Jyot oil/ghee",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Food & tea for priests",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "arp-standard",
          "name": {
            "en": "Standard — 4 Pandits + Coordinated Samagri",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 26500,
          "priceDisplay": "₹26,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Team of 4 Pandits reciting 24-hr continuous Ramcharitmanas",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete pure Hawan Samagri, 24-hr Akhand Jyot setup & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ram Darbar sthapana, Roli, Akshat, Janeu, Dhoop & Aarti items",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Meals & sleeping space for resting priests during shifts",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        },
        {
          "id": "arp-musical",
          "name": {
            "en": "Premium — 5 Pandits + Musical Recitation",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Musical Format",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 35000,
          "priceDisplay": "₹35,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "5 Pandits with continuous Harmonium & Dholak accompaniment",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Full 24-hr Akhand Jyot & Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ram Janma, Sita Vivah & Rajyabhishek special celebration Bhajans",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Venue catering",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "chandi-path-durga-saptashati-path": {
      "serviceId": "chandi-path-durga-saptashati-path",
      "serviceName": {
        "en": "Chandi Path (Durga Saptashati 700 Verses)",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3500,
      "maxPrice": 5500,
      "startingPriceDisplay": "From ₹3,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "3.5 hrs complete Durga Saptashati recitation with Kavach, Argala, and Kilak.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Chandi Path ranges from ₹5,500 to ₹16,000.",
      "missingBusinessInfo": "Recitation with or without concluding hawan.",
      "packages": [
        {
          "id": "cp-basic",
          "name": {
            "en": "Basic — Path Recitation Only",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Single Senior Pandit",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3500,
          "priceDisplay": "₹3,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit for complete 13 chapters of Durga Saptashati",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devi Kavach & Argala Stotra",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Hawan samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Red cloth & shringar",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Utensils",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "cp-standard",
          "name": {
            "en": "Standard — Path + Hawan Samagri Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit for complete Path & concluding Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Devi Shringar kit & red cloth included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh red flowers, coconuts & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "vishnu-sahasranam-path": {
      "serviceId": "vishnu-sahasranam-path",
      "serviceName": {
        "en": "Vishnu Sahasranam Path (1000 Holy Names)",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3200,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 hrs recitation of 1000 divine names with Tulsi archana.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Vishnu Sahasranam ranges from ₹2,800 to ₹6,500.",
      "missingBusinessInfo": "Tulsi leaf procurement.",
      "packages": [
        {
          "id": "vsp-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for 1000 Holy Names Recitation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Purusha Suktam chanting & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Tulsi leaves & dry fruits",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "vsp-standard",
          "name": {
            "en": "Standard — Ritual + Puja Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3200,
          "priceDisplay": "₹3,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Puja Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Chandan, Roli, Akshat, Janeu & Dhoop",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh Tulsi leaves & fruits",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "lalitha-sahasranam-puja": {
      "serviceId": "lalitha-sahasranam-puja",
      "serviceName": {
        "en": "Lalitha Sahasranam Puja & Kumkumarchana",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs recitation of 1000 names with red vermilion Kumkumarchana to Sri Yantra.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Lalitha Sahasranamam ranges from ₹3,500 to ₹8,500.",
      "missingBusinessInfo": "Sri Yantra availability.",
      "packages": [
        {
          "id": "lsp-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Lalitha Sahasranam & Kumkumarchana",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Kumkum box & Sri Yantra",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "lsp-standard",
          "name": {
            "en": "Standard — Ritual + Kumkumarchana Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure natural Kumkum for 1,000 name archana included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Hawan samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh red hibiscus flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "garud-puran-path": {
      "serviceId": "garud-puran-path",
      "serviceName": {
        "en": "Garud Puran Path (For Departed Souls)",
        "hi": "",
        "mr": ""
      },
      "category": "paths",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 5500,
      "maxPrice": 11000,
      "startingPriceDisplay": "From ₹5,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "Recited during 11 days of mourning for departed soul journey.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Garud Puran ranges from ₹8,500 to ₹25,000.",
      "missingBusinessInfo": "Condensed 3-day vs traditional 11-day path selection.",
      "packages": [
        {
          "id": "gp-condensed",
          "name": {
            "en": "Condensed 3-Day Path",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "3-Day Recitation",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 5500,
          "priceDisplay": "₹5,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya for condensed 3-day Saroddhara recitation",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Daily Pitru Tarpan & Shanti prayer",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Daily oil lamps & sesame seeds",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "gp-traditional",
          "name": {
            "en": "Traditional 10-Day Complete Path",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Complete 10-Day Vidhi",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 11000,
          "priceDisplay": "₹11,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Acharya visiting daily for full Garud Puran chapters",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Pitru Shanti hawan on concluding day with Hawan Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gau Daan & Pinda Daan guidance",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Daily household oil, sesame, and Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "graha-shanti-puja": {
      "serviceId": "graha-shanti-puja",
      "serviceName": {
        "en": "Graha Shanti Puja & Navagraha Homa",
        "hi": "",
        "mr": ""
      },
      "category": "shanti-pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4800,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs general planetary pacification before major life events.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Graha Shanti ranges from ₹4,800 to ₹12,000.",
      "missingBusinessInfo": "Difference vs Navagraha Havan (graha-shanti focuses on dosha pacification).",
      "packages": [
        {
          "id": "grs-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Graha Shanti Vidhi & Homa",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9-graha pujan & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9 grains & cloths",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "grs-standard",
          "name": {
            "en": "Standard — Ritual + Navagraha Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4800,
          "priceDisplay": "₹4,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "9 Navadhanya grains, 9 cloths & sacred wood",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, milk, flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "vivah-marriage": {
      "serviceId": "vivah-marriage",
      "serviceName": {
        "en": "Vivah (Complete Hindu Wedding Sanskar)",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 7500,
      "maxPrice": 16500,
      "startingPriceDisplay": "From ₹7,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "4 to 6 hrs complete Vedic wedding with Kanyadaan, Panigrahana, Laja Homa, Saptapadi & Sindoor Daan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Vivah ranges from ₹21,500 to ₹76,500.",
      "missingBusinessInfo": "Outstation wedding travel allowance & late night muhurat surcharge.",
      "packages": [
        {
          "id": "vm-basic",
          "name": {
            "en": "Basic — Senior Acharya Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Single Senior Acharya",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 7500,
          "priceDisplay": "₹7,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior North Indian Acharya conducting complete Vivah Sanskar & Saptapadi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Muhurat coordination & Vivah checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Dry fruits, puffed rice (Laja)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Mandap setup",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "vm-standard",
          "name": {
            "en": "Standard — Senior Acharya + Complete Vivah Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 11500,
          "priceDisplay": "₹11,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior North Indian Acharya conducting complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete Vivah Hawan Samagri kit, Laja (kheel) & pure cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sindoor, Roli, Akshat, Janeu, Kalash vastram & sacred Gathbandhan cloth",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh garlands (Jaimala), fruits, sweets, mandap brassware",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        },
        {
          "id": "vm-premium",
          "name": {
            "en": "Premium — 2 Acharyas + Full Vedic Chanting",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Grand Wedding Setup",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 16500,
          "priceDisplay": "₹16,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "2 Senior Acharyas (Purohit + Assistant Priest) for flawless Vedic chanting",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Complete premium Hawan Samagri box with pure cow ghee & dry fruits",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pre-wedding Lagna Patrika writing & Gotra pravara coordination",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Mandap physical decoration",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "engagement-puja-sagai": {
      "serviceId": "engagement-puja-sagai",
      "serviceName": {
        "en": "Engagement Puja (Sagai & Ring Ceremony)",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs formal mutual commitment blessing and ring sanctification.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Engagement ranges from ₹4,500 to ₹10,500.",
      "missingBusinessInfo": "Shagun thali layout guidance.",
      "packages": [
        {
          "id": "eng-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Gauri-Ganesh Pujan & Ring blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Vagdan Sankalp between families & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Shagun thali items",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "eng-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Chandan, Janeu, Kalash items & sacred thread",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, dry fruits & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "roka-ceremony": {
      "serviceId": "roka-ceremony",
      "serviceName": {
        "en": "Roka Ceremony & Pre-Vivah Sankalp",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3200,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 hrs initial commitment blessing and Tilak ceremony.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Roka ranges from ₹3,500 to ₹7,500.",
      "missingBusinessInfo": "Venue differential (home vs banquet).",
      "packages": [
        {
          "id": "rk-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Gauri-Ganesh Pujan & Tilak",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roka Sankalp & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Dry fruits, sweets, shagun",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "rk-standard",
          "name": {
            "en": "Standard — Ritual + Puja Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3200,
          "priceDisplay": "₹3,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Puja Samagri kit included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Akshat, Chandan, Moli & Dhoop",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh fruits, mithai & shagun gifts",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    },
    "haldi-ceremony": {
      "serviceId": "haldi-ceremony",
      "serviceName": {
        "en": "Traditional Haldi Ceremony Vidhi",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2100,
      "maxPrice": 3200,
      "startingPriceDisplay": "From ₹2,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1.5 hrs pre-wedding Vedic purification and turmeric sanctification.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Haldi ceremony ranges from ₹3,500 to ₹7,500.",
      "missingBusinessInfo": "Organic turmeric paste provision.",
      "packages": [
        {
          "id": "hl-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2100,
          "priceDisplay": "₹2,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Gauri-Ganesh & Haldi sanctification",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Raksha Sutra & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Turmeric roots / paste",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Fresh yellow marigolds",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "hl-standard",
          "name": {
            "en": "Standard — Ritual + Haldi Pujan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3200,
          "priceDisplay": "₹3,200*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Essential Puja Samagri kit & pure Kasturi turmeric powder included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Roli, Chandan, sacred thread",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh yellow flowers & sweets",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    },
    "kumbh-vivah-for-female": {
      "serviceId": "kumbh-vivah-for-female",
      "serviceName": {
        "en": "Kumbh Vivah (Manglik Shanti for Bride)",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 4500,
      "maxPrice": 6500,
      "startingPriceDisplay": "From ₹4,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs Mangal dosha remedy where bride is first married to a consecrated Vishnu Kumbh.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Kumbha Vivaha ranges from ₹6,500 to ₹18,000.",
      "missingBusinessInfo": "Clay Kumbh pot immersion instructions.",
      "packages": [
        {
          "id": "kv-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4500,
          "priceDisplay": "₹4,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit Dakshina for complete Kumbh Vivah Vidhi",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Manglik dosha nivaran chanting & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Clay Kumbh pot & Vishnu idol",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "kv-standard",
          "name": {
            "en": "Standard — Ritual + Full Kumbh Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 6500,
          "priceDisplay": "₹6,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Consecrated earthen Kumbh pot, yellow cloth, Janeu, Mangal samidha included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh flowers, coconuts & milk",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "ark-vivah-for-male": {
      "serviceId": "ark-vivah-for-male",
      "serviceName": {
        "en": "Ark Vivah (Manglik Shanti for Groom)",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 4500,
      "maxPrice": 6500,
      "startingPriceDisplay": "From ₹4,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs Manglik remedy where groom is symbolically married to an Ark (Madar) plant.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Arka Vivaha ranges from ₹6,500 to ₹18,000.",
      "missingBusinessInfo": "Procurement of flowering Ark plant.",
      "packages": [
        {
          "id": "av-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4500,
          "priceDisplay": "₹4,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit Dakshina for Ark Vivah Vidhi & Manglik Shanti",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Surya Pujan & Checklist",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ark plant",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ghee",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "av-standard",
          "name": {
            "en": "Standard — Ritual + Full Ark Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 6500,
          "priceDisplay": "₹6,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Ark Vivah cloths, sacred thread & Mangal samidha included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Live Ark / Madar plant (arranged at venue), fresh flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "tulsi-vivah-puja": {
      "serviceId": "tulsi-vivah-puja",
      "serviceName": {
        "en": "Tulsi Vivah Puja & Dev Uthani Ekadashi",
        "hi": "",
        "mr": ""
      },
      "category": "wedding-services",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4500,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs ceremonial marriage of Tulsi with Lord Shaligram.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Tulsi Vivaha ranges from ₹4,500 to ₹11,000.",
      "missingBusinessInfo": "Sugarcane mandap stalks arrangement.",
      "packages": [
        {
          "id": "tv-basic",
          "name": {
            "en": "Basic — Ritual Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for Tulsi-Shaligram Vivah Vidhi & Katha",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Red chunri & sugarcane stalks",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Prasad",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "tv-standard",
          "name": {
            "en": "Standard — Ritual + Hawan Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4500,
          "priceDisplay": "₹4,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Pandit Dakshina for ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pure Hawan Samagri kit & cow ghee included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Tulsi Red Chunri, Shaligram vastram, Roli, Akshat",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Sugarcane stalks (for mandap), fresh sweets, fruits",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-havan-samagri",
            "opt-cow-ghee",
            "opt-complete-kit"
          ]
        }
      ]
    },
    "pitru-paksha-mahalaya-shradh-puja": {
      "serviceId": "pitru-paksha-mahalaya-shradh-puja",
      "serviceName": {
        "en": "Pitru Paksha Mahalaya Shradh Puja",
        "hi": "",
        "mr": ""
      },
      "category": "pitru-pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 2500,
      "maxPrice": 3800,
      "startingPriceDisplay": "From ₹2,500*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2 hrs annual ancestral remembrance during Mahalaya with Pinda Daan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Shradh packages range from ₹3,500 to ₹10,800.",
      "missingBusinessInfo": "Pinda kheer preparation guidance.",
      "packages": [
        {
          "id": "pp-basic",
          "name": {
            "en": "Basic — Purohit Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2500,
          "priceDisplay": "₹2,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Purohit for Pitru Tarpan & Pinda Daan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gotra recitation for ancestors",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Black sesame, Kusha grass, barley flour",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pinda kheer",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "pp-standard",
          "name": {
            "en": "Standard — Purohit + Shradh Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3800,
          "priceDisplay": "₹3,800*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Experienced Purohit for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Black sesame (Kala Til), Kusha grass, Pinda Daan flour & Gangajal included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred thread (Janeu) & camphor for Balidana",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Fresh cow milk for tarpan, cooked pinda kheer, Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    },
    "amavasya-tarpan": {
      "serviceId": "amavasya-tarpan",
      "serviceName": {
        "en": "Amavasya Tarpan & Gau Daan",
        "hi": "",
        "mr": ""
      },
      "category": "pitru-pujas",
      "model": "fixed-price",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 1500,
      "maxPrice": 2200,
      "startingPriceDisplay": "₹1,500",
      "pricingNote": {
        "en": "Proposed fixed dakshina (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "1 hr monthly water and sesame oblation to ancestors.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Tarpan ranges from ₹1,500 to ₹4,500.",
      "missingBusinessInfo": "Gaushala Gau-grass coordination in Pune.",
      "packages": [
        {
          "id": "at-standard",
          "name": {
            "en": "Monthly Tarpan Vidhi",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Doorstep Service",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 1500,
          "priceDisplay": "₹1,500",
          "priceNote": {
            "en": "Fixed standard dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Purohit Dakshina for 3-generation Pitru Tarpan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Gotra & Nakshatra sankalp",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Sacred Kusha grass & Black sesame included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Devotee provides clean water, milk, and white flowers",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "at-with-gaudaan",
          "name": {
            "en": "Tarpan + Gau Daan Token",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 2200,
          "priceDisplay": "₹2,200",
          "priceNote": {
            "en": "Includes Gaushala grass token",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Purohit Dakshina for complete Tarpan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Kusha grass, Til & Gangajal included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Token grass donation consecrated in ancestor name for cow feed",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Household vessels",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        }
      ]
    },
    "barsi-ceremony": {
      "serviceId": "barsi-ceremony",
      "serviceName": {
        "en": "Barsi Ceremony (Annual Shradh)",
        "hi": "",
        "mr": ""
      },
      "category": "pitru-pujas",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 3100,
      "maxPrice": 4500,
      "startingPriceDisplay": "From ₹3,100*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "2.5 hrs annual death anniversary ceremony with formal Pinda Daan.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Barsi ranges from ₹4,500 to ₹12,500.",
      "missingBusinessInfo": "Vastram donation for presiding Brahmin.",
      "packages": [
        {
          "id": "br-basic",
          "name": {
            "en": "Basic — Purohit Dakshina",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "Devotee Arranges Samagri",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 3100,
          "priceDisplay": "₹3,100*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Purohit Dakshina for Barsi Shradh & Pinda Daan",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Samagri kit",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Pinda flour, sesame, milk",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Brahmin bhojan",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "br-standard",
          "name": {
            "en": "Standard — Purohit + Complete Shradh Kit",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 4500,
          "priceDisplay": "₹4,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Senior Purohit for complete ceremony",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Black sesame (Kala Til), Kusha grass, Pinda flour & Gangajal included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Vastram token for Brahmin & incense included",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Cooked pinda kheer & family feast",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    },
    "mata-ki-chowki": {
      "serviceId": "mata-ki-chowki",
      "serviceName": {
        "en": "Mata Ki Chowki & Akhand Jyot",
        "hi": "",
        "mr": ""
      },
      "category": "bhajans-chowki",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 11000,
      "maxPrice": 28000,
      "startingPriceDisplay": "From ₹11,000*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "4 to 6 hrs devotional program with lead singer, musicians, and Akhand Jyot.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Chowki ranges from ₹18,000 to ₹55,000.",
      "missingBusinessInfo": "Sound system capacity & artist count per package.",
      "packages": [
        {
          "id": "mkc-basic",
          "name": {
            "en": "Devotional Recital — 3 Performing Artists",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "3 Artists",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 11000,
          "priceDisplay": "₹11,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Lead Bhajan Singer + Harmonium + Dholak Player",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Chowki Sthapana & Akhand Jyot blessing",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Checklist provided",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "External sound system",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Bhog & dry fruit distribution",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": []
        },
        {
          "id": "mkc-standard",
          "name": {
            "en": "Devotional Recital — 5 Artists + Audio Setup",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 18500,
          "priceDisplay": "₹18,500*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Lead Singer + Female Co-Singer + Dholak + Octapad + Harmonium",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Apartment/Hall Sound System & Microphones included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Chowki Pujan Samagri, Chunri & Akhand Jyot setup included",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Tara Rani Katha & Maha Aarti",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Prasad & 56 Bhog catering",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        },
        {
          "id": "mkc-premium",
          "name": {
            "en": "Premium Troupe — 7 Artists + Grand Bhawan",
            "hi": "",
            "mr": ""
          },
          "tier": "premium",
          "badge": {
            "en": "Grand Setup",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 28000,
          "priceDisplay": "₹28,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Complete 7-artist Troupe (Lead Singers, Full Percussion, Flute/Synthesizer)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "High-fidelity Sound setup with stage mics",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Grand Bhawan decorative floral backdrop support & Chhappan Bhog aarti",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Hall rental and catering",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    },
    "jagran-puja": {
      "serviceId": "jagran-puja",
      "serviceName": {
        "en": "Raat Ka Jagran & Bhajan Sandhya",
        "hi": "",
        "mr": ""
      },
      "category": "bhajans-chowki",
      "model": "package-pricing",
      "approvalStatus": "proposed",
      "isBusinessApproved": false,
      "minPrice": 31000,
      "maxPrice": 45000,
      "startingPriceDisplay": "From ₹31,000*",
      "pricingNote": {
        "en": "Proposed rate card (Awaiting business confirmation)",
        "hi": "",
        "mr": ""
      },
      "pricingRationale": {
        "en": "All-night (9 PM to 5 AM) devotional vigil with orchestra, sound, and Tara Rani katha.",
        "hi": "",
        "mr": ""
      },
      "researchBasis": "Harivara Jagran ranges from ₹35,000 to ₹85,000+.",
      "missingBusinessInfo": "Jhanki artists availability in Pune/PCMC.",
      "packages": [
        {
          "id": "jg-standard",
          "name": {
            "en": "Standard Jagran — 5-Artist Orchestra",
            "hi": "",
            "mr": ""
          },
          "tier": "standard",
          "badge": {
            "en": "All-Night Vigil",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 31000,
          "priceDisplay": "₹31,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "5-Member All-Night Devotional Troupe (9 PM to 5 AM)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "High-power sound system and stage microphones",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Akhand Jyot, Ganesh Pujan, Tara Rani Katha & morning Aarti",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Jhanki stage actors",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Midnight tea/snacks for devotees",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        },
        {
          "id": "jg-grand",
          "name": {
            "en": "Grand Jagran — 7 Artists + Jhanki Presentations",
            "hi": "",
            "mr": ""
          },
          "tier": "popular",
          "badge": {
            "en": "Most Popular",
            "hi": "",
            "mr": ""
          },
          "indicativePrice": 45000,
          "priceDisplay": "₹45,000*",
          "priceNote": {
            "en": "Proposed starting dakshina",
            "hi": "",
            "mr": ""
          },
          "inclusions": [
            {
              "en": "Full 7-Artist Orchestra with dynamic sound system",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Live mythological Jhanki performances (Radha Krishna, Shiva Tandav)",
              "hi": "",
              "mr": ""
            },
            {
              "en": "Akhand Jyot setup, Hawan Samagri & morning Aarti with conch",
              "hi": "",
              "mr": ""
            }
          ],
          "exclusions": [
            {
              "en": "Large public tent setup",
              "hi": "",
              "mr": ""
            }
          ],
          "includedSamagriIds": [
            "opt-complete-kit"
          ]
        }
      ]
    }
  },
  "samagriOptions": [
    {
      "id": "opt-havan-samagri",
      "name": {
        "en": "Pure Herbal Hawan Samagri Pack (1.5 kg)",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "Herbal mixture with 54 Ayurvedic herbs, guggul, loban, black sesame & sacred wood",
        "hi": "",
        "mr": ""
      },
      "price": 950,
      "priceDisplay": "₹950",
      "category": "havan",
      "isPriceVerified": true,
      "includedInTiers": [
        "popular"
      ]
    },
    {
      "id": "opt-cow-ghee",
      "name": {
        "en": "Pure Desi Cow Ghee for Homa (500g)",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "Consecrated pure cow ghee for sacred Agnihotra fire offerings",
        "hi": "",
        "mr": ""
      },
      "price": null,
      "priceDisplay": "Price to be confirmed",
      "category": "ghee",
      "isPriceVerified": false,
      "includedInTiers": [
        "popular"
      ]
    },
    {
      "id": "opt-complete-kit",
      "name": {
        "en": "Complete Dry Puja & Hawan Samagri Box",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "Full box: Gangajal, Roli, Akshat, Janeu, Kalash vastram & Dry Fruits",
        "hi": "",
        "mr": ""
      },
      "price": null,
      "priceDisplay": "Price to be confirmed",
      "category": "kits",
      "isPriceVerified": false,
      "includedInTiers": [
        "popular"
      ]
    },
    {
      "id": "opt-flowers",
      "name": {
        "en": "Fresh Flowers & Toran Garland",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "Fresh marigold garlands, loose puja flowers & sacred tulsi",
        "hi": "",
        "mr": ""
      },
      "price": null,
      "priceDisplay": "Price to be confirmed",
      "category": "fresh",
      "isPriceVerified": false,
      "includedInTiers": []
    },
    {
      "id": "opt-fruits",
      "name": {
        "en": "Pancha-Phala (5 Fresh Seasonal Fruits)",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "5 varieties of fresh fruits for sacred Naivedya offering",
        "hi": "",
        "mr": ""
      },
      "price": null,
      "priceDisplay": "Price to be confirmed",
      "category": "fresh",
      "isPriceVerified": false,
      "includedInTiers": []
    },
    {
      "id": "opt-coconut",
      "name": {
        "en": "Purna Shrifal (Sacred Coconuts with Water)",
        "hi": "",
        "mr": ""
      },
      "description": {
        "en": "2 auspicious water coconuts for Kalash Sthapana & Balidana",
        "hi": "",
        "mr": ""
      },
      "price": null,
      "priceDisplay": "Price to be confirmed",
      "category": "fresh",
      "isPriceVerified": false,
      "includedInTiers": []
    }
  ]
}
$seed$::jsonb)
on conflict (id) do nothing;
