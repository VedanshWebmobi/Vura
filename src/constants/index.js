export const icon = {
  BACKGROUND: require("../../assets/background.png"),
  LOGO: require("../../assets/logo.png"),
  PROFILE: require("../../assets/person.png"),
  SIGNOUT: require("../../assets/signout.png"),
  BANNER_ICON: require("../../assets/BannerIcon.png"),
  SIDE_BAR: require("../../assets/sidebar.png"),
  BACK_ICON: require("../../assets/back.png"),
  PROFILE_ICON: require("../../assets/profileIcon.png"),
  CHECK_ICON: require("../../assets/check_circle.png"),
  EDIT: require("../../assets/edit.png"),
  CAMERA: require("../../assets/camera.png"),
  CAMERA_NEW: require("../../assets/camera_new.png"),
  PROFILE_PIC: require("../../assets/profile.png"),
  GALLERY: require("../../assets/gallery.png"),
  SUNFLOWER: require("../../assets/sunFlower.png"),
  CASHBACK: require("../../assets/cashBack.png"),
  CASHBACK_CHART: require("../../assets/CashBack_Chart.png"),
  PRODUCT: require("../../assets/products.png"),
  OFFER_CHART: require("../../assets/Offer_Chart.png"),
  OFFERS: require("../../assets/offers.png"),
  SCAN: require("../../assets/scan.png"),
  WALLET: require("../../assets/wallet.png"),
  BLACK_ICON: require("../../assets/BlackIcon.png"),
  PERSONAL_DETAILS: require("../../assets/personalDetails.png"),
  BANK_DETAILS: require("../../assets/bankDetails.png"),
  ARROW: require("../../assets/arrow.png"),
  MENU: require("../../assets/menu.png"),
  TROPHY: require("../../assets/trophy.png"),
  GIFT: require("../../assets/gift.png"),
  IMAGE1: require("../../assets/image1.png"),
  IMAGE2: require("../../assets/image2.png"),
  IMAGE3: require("../../assets/image3.png"),
  IMAGE4: require("../../assets/image4.png"),
  IMAGE5: require("../../assets/image5.png"),
  IMAGE6: require("../../assets/image6.png"),
  CEMENT: require("../../assets/cement.png"),
  DOWNLOAD_ICON: require("../../assets/downloadIcon.png"),
  PROFILE_NEW: require("../../assets/profile_new.png"),
  PROFILE_CIRCLE: require("../../assets/profile_circle.png"),
  PDF_DIS: require("../../assets/pdf_dis.png"),
  ADD_DIS: require("../../assets/add_dis.png"),
  Down_DIS: require("../../assets/down_arrow.png"),
  SEARCH_ICN_DIS: require("../../assets/searc_icon_dis.png"),
  FILTER_DIS: require("../../assets/filter_dis.png"),
  EDIT_DIS: require("../../assets/edit_dis.png"),
  ORDER_ICON: require("../../assets/order_icon.png"),
  ACCOUNT_ICON: require("../../assets/account_icon.png"),
  CHART_ICON: require("../../assets/chart.png"),
};

export const font = {
  GoldPlay_Regular: "Gp_Regular",
  GoldPlay_SemiBold: "Gp_SemiBold",
  GoldPlay_Medium: "Gp_Medium",
};

export const colors = {
  YELLOW: "#ffdd00",
  GREY: "#909DAD",
  GREY_400: "#4F5965",
  BLACK: "#1B1B19",
  GREY_TXT: "#BBBFC3",
  PRIMARY: "#FFDE1B",
  LINE_GREY: "#E9EAEC",
  LIGHT_GREY: "#C4C2C2",
  SUCCESS_GREEN: "#5cb85c",
  ERROR_RED: "#cc0000",
  INVOICE_GREY: "#666666",
  WHITE: "#FFFFFF",
};

export const ExpoSecureKey = {
  IS_LOGIN: "is_login",
  TOKEN: "token",
  IS_REGISTER: "is_register",
  SELECTED_CATEGORY: "selectedCategory",
};

export const AllCategory = [
  { id: "1", productCategoryName: "Ceramic" },
  { id: "2", productCategoryName: "WaterProofing" },
  { id: "3", productCategoryName: "Repairs" },
  { id: "4", productCategoryName: "Maintenance" },
  { id: "5", productCategoryName: "Stonecare" },
];

export const AllProduct = [
  {
    id: "32",
    product_name: "Vura KrafTile (G) 20",
    productCode: "KTG20",
    productCategory: "1",
    description: "POLYMER MODIFIED NORMAL TILE ADHESIVE",
    characteristics:
      "- C1 T as per EN 12004\r\n- Type 1 T as per IS 15477:2019\r\n- For Ceramic and Vitrified Tiles\r\n- Grouting on the wall only after 8 hour\r\n- Application up to 10mm\r\n- For floor & wall interior application\r\n- Adjustable\r\n- Excellent workability\r\n- No vertical slip\r\n- Economical & easy to use",
    usageGuide: "",
    regularPrice: "690",
    salesPrice: "207",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "10.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "18",
    createdAt: "2024-05-06 12:32:43",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "85",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1742440338_67db8792b67a9.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "77",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-KrafTile.pdf",
        productDocName: "MSDS-KrafTile",
      },
      {
        productDocId: "78",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-KrafTile.pdf",
        productDocName: "MS-KrafTile",
      },
      {
        productDocId: "79",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-KrafTile.pdf",
        productDocName: "TDS-KrafTile",
      },
    ],
  },
  {
    id: "15",
    product_name: "Vura FasTile (G)",
    productCode: "FAS20",
    productCategory: "1",
    description: "TILE ADHESIVE FOR CERAMIC & VITRIFIED TILES",
    characteristics:
      "- C1 T compliant with EN 12004 standard\r\n- Type 2 T as per IS 15477-2019\r\n- For ceramic and Vitrified tiles\r\n- No vertical slip\r\n- Application up to 10 mm\r\n- Prolonged workability\r\n- Adjustable\r\n- Excellent workability\r\n- Tile on Tile Application on the floor",
    usageGuide: "",
    regularPrice: "771",
    salesPrice: "259",
    size: "20",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "15.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "1",
    createdAt: "2024-05-06 11:41:28",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "112",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1746781786_681dc65ab2755.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "33",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTile.pdf",
        productDocName: "MSDS-FasTile",
      },
      {
        productDocId: "34",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTile.pdf",
        productDocName: "MS-FasTile",
      },
      {
        productDocId: "35",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTile.pdf",
        productDocName: "TDS-FasTile",
      },
    ],
  },
  {
    id: "85",
    product_name: "Vura FasTile (W) 20",
    productCode: "FAS20",
    productCategory: "1",
    description: "TILE ADHESIVE FOR CERAMIC & VITRIFIED TILES",
    characteristics:
      "- C1 T compliant with EN 12004 standard\r\n- Type 2 T as per IS 15477-2019\r\n- For ceramic and Vitrified tiles\r\n- No vertical slip\r\n- Application up to 10 mm\r\n- Prolonged workability\r\n- Adjustable\r\n- Excellent workability\r\n- Tile on Tile Application on the floor",
    usageGuide: "",
    regularPrice: "1116",
    salesPrice: "411",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "15.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "52",
    createdAt: "2025-04-14 15:38:15",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "89",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744625295_67fcde8f7cd05.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "105",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTile.pdf",
        productDocName: "MSDS-FasTile",
      },
      {
        productDocId: "106",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTile.pdf",
        productDocName: "MS-FasTile",
      },
      {
        productDocId: "107",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTile.pdf",
        productDocName: "TDS-FasTile",
      },
    ],
  },
  {
    id: "16",
    product_name: "Vura FasTile+ (G) 20",
    productCode: "FAS20",
    productCategory: "1",
    description: "POLYMER MODIFIED IMPROVED TILE ADHESIVE",
    characteristics:
      "- C2 TE compliant with EN12004 standard\r\n- Type 2 T as per IS 15477:2019\r\n- Perfect adherence\r\n- Allows installation of tiles from top towards the bottom\r\n- No Vertical Slip\r\n- Application upto 10mm\r\n- Easily trowelable\r\n- Can be used for the tile on tile application\r\n- Extended Open Time",
    usageGuide: "",
    regularPrice: "1050",
    salesPrice: "384",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "20.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "2",
    createdAt: "2024-05-06 11:45:32",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "111",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969740_6802200c4a7f1.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "36",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTile-Plus.pdf",
        productDocName: "MSDS-FasTile-Plus",
      },
      {
        productDocId: "37",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTile-Plus.pdf",
        productDocName: "MS-FasTile-Plus",
      },
      {
        productDocId: "38",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTile-Plus.pdf",
        productDocName: "TDS-FasTile-Plus",
      },
    ],
  },
  {
    id: "17",
    product_name: "Vura FasTile+ (W) 20",
    productCode: "FAS+20",
    productCategory: "1",
    description: "POLYMER MODIFIED IMPROVED TILE ADHESIVE",
    characteristics:
      "- C2 TE compliant with EN12004 standard\r\n- Type 2 T as per IS 15477:2019\r\n- Perfect adherence\r\n- Allows installation of tiles from top towards the bottom\r\n- No Vertical Slip\r\n- Application upto 10mm\r\n- Easily trowelable\r\n- Can be used for the tile on tile application\r\n- Extended Open Time",
    usageGuide: "",
    regularPrice: "1200",
    salesPrice: "465",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "20.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "3",
    createdAt: "2024-05-06 11:48:57",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "110",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969698_68021fe224415.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "39",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTile-Plus.pdf",
        productDocName: "MSDS-FasTile-Plus",
      },
      {
        productDocId: "40",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTile-Plus.pdf",
        productDocName: "MS-FasTile-Plus",
      },
      {
        productDocId: "41",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTile-Plus.pdf",
        productDocName: "TDS-FasTile-Plus",
      },
    ],
  },
  {
    id: "18",
    product_name: "Vura FasTone (G) 20",
    productCode: "FST20",
    productCategory: "1",
    description: "POLYMER MODIFIED TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE compliant with EN12004 standard\r\n- Type 3 T as per IS 15477-2019\r\n- For ceramic, vitrified (semi and fully) tiles, glass mosaic and natural stone (non-sensitive)\r\n- On balconies, terraces, wet rooms, bathrooms and swimming pools\r\n- On water proof and moisture proof layers\r\n- For large and small tiles\r\n- For inside and outside use\r\n- Longer open time for safer application\r\n- Easy and excellent workability thanks to plastified consistency\r\n- Application Up to 12mm\r\n- Adjustable",
    usageGuide: "",
    regularPrice: "1290",
    salesPrice: "456",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "25.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "4",
    createdAt: "2024-05-06 11:52:36",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "109",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969676_68021fcc5797d.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "42",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone.pdf",
        productDocName: "MSDS-FasTone",
      },
      {
        productDocId: "43",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone.pdf",
        productDocName: "MS-FasTone",
      },
      {
        productDocId: "44",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone.pdf",
        productDocName: "TDS-FasTone",
      },
    ],
  },
  {
    id: "19",
    product_name: "Vura FasTone (W) 20",
    productCode: "FST20",
    productCategory: "1",
    description: "POLYMER MODIFIED TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE compliant with EN12004 standard\r\n- Type 3 T as per IS 15477-2019\r\n- For ceramic, vitrified (semi and fully) tiles, glass mosaic and natural stone (non-sensitive)\r\n- On balconies, terraces, wet rooms, bathrooms and swimming pools\r\n- On water proof and moisture proof layers\r\n- For large and small tiles\r\n- For inside and outside use\r\n- Longer open time for safer application\r\n- Easy and excellent workability thanks to plastified consistency\r\n- Application Up to 12mm\r\n- Adjustable",
    usageGuide: "",
    regularPrice: "1500",
    salesPrice: "573",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "25.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "5",
    createdAt: "2024-05-06 11:53:24",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "108",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969650_68021fb2212fa.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "45",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone.pdf",
        productDocName: "MSDS-FasTone",
      },
      {
        productDocId: "46",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone.pdf",
        productDocName: "MS-FasTone",
      },
      {
        productDocId: "47",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone.pdf",
        productDocName: "TDS-FasTone",
      },
    ],
  },
  {
    id: "56",
    product_name: "VURA EnHanso - 250ML",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Enriches color\r\n- Maintains the gloss of the polish\r\n- Does not form a layer on the surface of the stone\r\n- Allows the stone to breathe\r\n- Excellent weather and UV resistance\r\n- Durable\r\n- Non-yellowing\r\n- For interior and exterior use\r\n- Long working time\r\n- Imparts wet look\r\n- Water, Oil and dirt resistant",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "250",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "",
    sort_order: "25",
    createdAt: "2025-02-10 16:31:01",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "59",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185261_67a9dc6dcf7a1.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "163",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura EnHanso _ TDS JAN25.pdf",
        productDocName: "Vura EnHanso _ TDS JAN25",
      },
      {
        productDocId: "164",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura EnHanso _ MSDS JAN25.pdf",
        productDocName: "Vura EnHanso _ MSDS JAN25",
      },
    ],
  },
  {
    id: "57",
    product_name: "VURA SanStone",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Deep penetration\r\n- Easy to use – Brushable / Sprayable\r\n- UV resistance\r\n- Durable\r\n- Water repellent\r\n- Retains breathability of substrate (does not trap moisture)\r\n- Resistance to alkalis\r\n- Tack-free drying\r\n- Invisible coating, does not change the color\r\n- Cost effective",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "26",
    createdAt: "2025-02-10 16:37:53",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "60",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185673_67a9de0924263.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "161",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura SanStone _ MSDS JAN25.pdf",
        productDocName: "Vura SanStone _ MSDS JAN25",
      },
      {
        productDocId: "162",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura SanStone _ TDS JAN25.pdf",
        productDocName: "Vura SanStone _ TDS JAN25",
      },
    ],
  },
  {
    id: "58",
    product_name: "VURA FiSeal Pro 1 Ltr",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Fluoropolymer based product\r\n- Nano impregnating technology\r\n- Breathable\r\n- Resistance to UV radiation\r\n- The color of the stone is normally not enhanced (preliminary test)\r\n- Enhance adhesion strength\r\n- Reduction of water and dirt absorption during periods of moisture\r\n- Maintenance of breathing properties because there is no surface layer",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "27",
    createdAt: "2025-02-10 16:39:07",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "61",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185747_67a9de53b9092.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "159",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal Pro _ TDS JAN25.pdf",
        productDocName: "Vura FiSeal Pro _ TDS JAN25",
      },
      {
        productDocId: "160",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal Pro _ MSDS JAN25.pdf",
        productDocName: "Vura FiSeal Pro _ MSDS JAN25",
      },
    ],
  },
  {
    id: "59",
    product_name: "VURA Oxi 4010",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Hardens relatively quickly\r\n- It has highly penetrative properties on account of its low viscosity\r\n- Clear transparent, best suitable for light natural stones\r\n- Solvent free epoxy system\r\n- Weather-resistant\r\n- Chemical resistant\r\n- Excellent grinding and polishing properties\r\n- Increases the firmness and improves the quality of natural stone surfaces\r\n- Increases the yield and the productivity\r\n- Excellent product to fill pinholes and cracks of light-colored marble\r\n",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1.25",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "28",
    createdAt: "2025-02-10 16:40:16",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "62",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185816_67a9de98ec82b.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "157",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 4010 _ MSDS JAN25.pdf",
        productDocName: "Vura Oxi 4010 _ MSDS JAN25",
      },
      {
        productDocId: "158",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 4010 _ TDS JAN25.pdf",
        productDocName: "Vura Oxi 4010 _ TDS JAN25",
      },
    ],
  },
  {
    id: "60",
    product_name: "VURA PoliMast",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Good working properties creamy-soft consistency, especially on vertical surfaces\r\n- Fast hardening (20-30 minutes)\r\n- Good working properties (grinding, milling, drilling)\r\n- Good polishing properties\r\n- Very good adhesion on natural stones also at higher temperatures\r\n- Resistance to water, petrol and mineral oils",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1.35",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "29",
    createdAt: "2025-02-10 16:41:46",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "63",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185906_67a9def2b71b1.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "155",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliMast _ TDS JAN25.pdf",
        productDocName: "VURA PoliMast _ TDS JAN25",
      },
      {
        productDocId: "156",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliMast _ MSDS JAN25.pdf",
        productDocName: "VURA PoliMast _ MSDS JAN25",
      },
    ],
  },
  {
    id: "61",
    product_name: "VURA Oxi2010",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Hardens relatively quickly\r\n- It has highly penetrative properties on account of its low viscosity\r\n- Clear transparent, best suitable for light natural stones\r\n- Solvent free epoxy system\r\n- Weather-resistant\r\n- Chemical resistant\r\n- Excellent grinding and polishing properties\r\n- Increases the firmness and improves the quality of natural stone surfaces\r\n- Increases the yield and the productivity\r\n- Excellent product to fill pinholes and cracks of light-colored marble\r\n",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1.5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "30",
    createdAt: "2025-02-10 16:43:15",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "64",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739185995_67a9df4b0fc38.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "153",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 2010 _ TDS JAN25.pdf",
        productDocName: "Vura Oxi 2010 _ TDS JAN25",
      },
      {
        productDocId: "154",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 2010 _ MSDS JAN25.pdf",
        productDocName: "Vura Oxi 2010 _ MSDS JAN25",
      },
    ],
  },
  {
    id: "77",
    product_name: "VURA UnicolorTint",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Color matching of the adhesive to many common stone colors\r\n- VURA Unicolor Tint can be used with different adhesives based on Epoxy, Polyester and PUR.\r\n- High intensity pigment tint, easy adjustment of color shades\r\n- Fluid consistency (of tint) makes it easier to mix with different consistency adhesives\r\n- No fading – UV & light resistant tint\r\n- Properties of the colored adhesives would remain same\r\n",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "50",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "",
    sort_order: "46",
    createdAt: "2025-03-12 09:16:01",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "80",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1741751161_67d10379a744b.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "121",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura UniColor Tint _ MSDS MAR25.pdf",
        productDocName: "Vura UniColor Tint _ MSDS MAR25",
      },
      {
        productDocId: "122",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Unicolor Tint  _ TDS MAR25.pdf",
        productDocName: "Vura Unicolor Tint  _ TDS MAR25",
      },
    ],
  },
  {
    id: "80",
    product_name: "Vura Flex S1 (G) 20",
    productCode: "FX20",
    productCategory: "1",
    description: "POLYMER MODIFIED FLEXIBLE ADHESIVE",
    characteristics:
      "- C2TES1 compliant with EN12004 standard\r\n- Type 3T S1 as per IS15477:2019\r\n- With visible fibers for strength and flexibility balancing substrate deformations on critical surfaces like balconies, terraces, wet rooms, bathrooms, swimming pool and external facade etc.\r\n- For ceramic, vitrified tiles (semi and fully), glass mosaic and natural stone (non-sensitive)\r\n- Suitable for large scale and heavy-duty vitrified tiles\r\n- Suitable for natural stones (internal as well as external application)\r\n",
    usageGuide: "",
    regularPrice: "1590",
    salesPrice: "639",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "30.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "49",
    createdAt: "2025-03-19 09:57:20",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "83",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1742358440_67da47a85ae1d.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "114",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ MS MAR 25.pdf",
        productDocName: "Vura Flex S1 _ MS MAR 25",
      },
      {
        productDocId: "115",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ MSDS MRA25.pdf",
        productDocName: "Vura Flex S1 _ MSDS MRA25",
      },
      {
        productDocId: "116",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ TDS MAR 25.pdf",
        productDocName: "Vura Flex S1 _ TDS MAR 25",
      },
    ],
  },
  {
    id: "81",
    product_name: "Vura Flex S1 (W) 20",
    productCode: "FX20",
    productCategory: "1",
    description: "POLYMER MODIFIED FLEXIBLE ADHESIVE",
    characteristics:
      "- C2TES1 compliant with EN12004 standard\r\n- Type 3T S1 as per IS15477:2019\r\n- With visible fibers for strength and flexibility balancing substrate deformations on critical surfaces like balconies, terraces, wet rooms, bathrooms, swimming pool and external facade etc.\r\n- For ceramic, vitrified tiles (semi and fully), glass mosaic and natural stone (non-sensitive)\r\n- Suitable for large scale and heavy-duty vitrified tiles\r\n- Suitable for natural stones (internal as well as external application)\r\n",
    usageGuide: "",
    regularPrice: "1800",
    salesPrice: "718",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "40.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "50",
    createdAt: "2025-03-19 10:03:02",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "84",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1742358782_67da48fe9e2d7.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "111",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ TDS MAR 25.pdf",
        productDocName: "Vura Flex S1 _ TDS MAR 25",
      },
      {
        productDocId: "112",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ MSDS MRA25.pdf",
        productDocName: "Vura Flex S1 _ MSDS MRA25",
      },
      {
        productDocId: "113",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Flex S1 _ MS MAR 25.pdf",
        productDocName: "Vura Flex S1 _ MS MAR 25",
      },
    ],
  },
  {
    id: "78",
    product_name: "VURA PoliMast G",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Good working properties, knife-cut consistency\r\n- Fast hardening (15-25 minutes)\r\n- Good working properties\r\n- Very good adhesion on natural stones also at higher temperatures\r\n- Resistance to water, petrol and mineral oils",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "45.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "47",
    createdAt: "2025-03-12 09:17:24",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "81",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1741751244_67d103cc67739.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "119",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PoliMast G _ MSDS MAR25.pdf",
        productDocName: "Vura PoliMast G _ MSDS MAR25",
      },
      {
        productDocId: "120",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PoliMast G _ MSDS MAR25.pdf",
        productDocName: "Vura PoliMast G _ MSDS MAR25",
      },
    ],
  },
  {
    id: "20",
    product_name: "Vura FasTone S1 (G) 20",
    productCode: "FST S120",
    productCategory: "1",
    description: "DEFORMABLE TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE S1 compliant with EN 12004 standard\r\n- Type 4 T S1 as per IS 15477-2019\r\n- With visible fibres for strength and flexibility balancing substrate deformations on critical surfaces like balconies, terraces, wet rooms, bathrooms, swimming pool and external facade etc\r\n- For ceramic, vitrified tiles (semi and fully), glass mosaic and natural stone (non-sensitive)\r\n- Suitable for large scale and heavy duty vitrified tiles\r\n- Suitable for natural stones on internal as well as external application",
    usageGuide: "",
    regularPrice: "1950",
    salesPrice: "756",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "50.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "6",
    createdAt: "2024-05-06 11:55:23",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "107",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969545_68021f495a300.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "48",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone S1.pdf",
        productDocName: "MSDS-FasTone S1",
      },
      {
        productDocId: "49",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone S1.pdf",
        productDocName: "MS-FasTone S1",
      },
      {
        productDocId: "50",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone S1.pdf",
        productDocName: "TDS-FasTone S1",
      },
    ],
  },
  {
    id: "21",
    product_name: "Vura FasTone S1 (W) 20",
    productCode: "FST S120",
    productCategory: "1",
    description: "DEFORMABLE TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE S1 compliant with EN 12004 standard\r\n- Type 4 T S1 as per IS 15477-2019\r\n- With visible fibres for strength and flexibility balancing substrate deformations on critical surfaces like balconies, terraces, wet rooms, bathrooms, swimming pool and external facade etc\r\n- For ceramic, vitrified tiles (semi and fully), glass mosaic and natural stone (non-sensitive)\r\n- Suitable for large scale and heavy duty vitrified tiles\r\n- Suitable for natural stones on internal as well as external application",
    usageGuide: "",
    regularPrice: "2400",
    salesPrice: "880",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "55.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "7",
    createdAt: "2024-05-06 11:56:55",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "106",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969499_68021f1b585d5.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "51",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone S1.pdf",
        productDocName: "MSDS-FasTone S1",
      },
      {
        productDocId: "52",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone S1.pdf",
        productDocName: "MS-FasTone S1",
      },
      {
        productDocId: "53",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone S1.pdf",
        productDocName: "TDS-FasTone S1",
      },
    ],
  },
  {
    id: "50",
    product_name: "Vura Oxi 1",
    productCode: "OXI1",
    productCategory: "1",
    description: "ULTRA EPOXY PREMIUM",
    characteristics:
      "- Indoor and Outdoor Use\r\n- Optimized UV and weather resistant\r\n- Stable and uniform colors for all types of tiles/stones\r\n- Easy application and cleaning as cementitious grout mortar\r\n- Excellent chemical resistance\r\n- High mechanical strength\r\n- Non Toxic, Anti-bacterial & Anti-Fungal\r\n- Strong, Durable\r\n- Ideal for waterproof grouting\r\n- Vertical resistance/Slip resistance\r\n- Can be used as a grout mortar and adhesive\r\n- Joint width 1 to 12 mm\r\n- Suitable for the contact with food\r\n- Available in 24 color",
    usageGuide: "",
    regularPrice: "1200",
    salesPrice: "525",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "1",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "21",
    createdAt: "2024-05-09 14:36:46",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "95",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744967341_680216adb733f.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "94",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-Oxi.pdf",
        productDocName: "MSDS-Oxi",
      },
      {
        productDocId: "95",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-Oxi.pdf",
        productDocName: "MS-Oxi",
      },
      {
        productDocId: "96",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-Oxi.pdf",
        productDocName: "TDS-Oxi",
      },
    ],
  },
  {
    id: "62",
    product_name: "VURA DenStone 200",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Easy application\r\n- Strengthen the surface\r\n- Penetrates and seals new and existing marble, natural stones, terrazzo and concrete\r\n- Improves chemical and water resistance\r\n- Prolongs finish of polished surfaces\r\n- Resists stains and Increase abrasion\r\n- Making surface easy to use and maintain\r\n- Environmentally friendly, water based formula\r\n- Interior and Exterior use\r\n- Protects against efflorescence\r\n- Enhance gloss after polish\r\n- Preserves Natural look",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "31",
    createdAt: "2025-02-10 16:46:34",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "94",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744966106_680211da1fc19.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "151",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 200_ MSDS JAN25.pdf",
        productDocName: "Vura DenStone 200_ MSDS JAN25",
      },
      {
        productDocId: "152",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 200 _ TDS JAN25.pdf",
        productDocName: "Vura DenStone 200 _ TDS JAN25",
      },
    ],
  },
  {
    id: "63",
    product_name: "VURA DenStone 800",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Penetrates and seals new and existing marble, natural stones, terrazzo and concrete\r\n- Improves chemical and water resistance\r\n- Deepens clarity and heightens gloss\r\n- Increase abrasion resistance\r\n- Reduces alkalinity / efflorescence\r\n- Easy to use and maintain\r\n- Interior and exterior use\r\n- User friendly, non-whitening\r\n- Environmentally friendly, water based formula\r\n- VOC compliant",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "32",
    createdAt: "2025-02-10 16:47:44",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "93",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744966039_68021197bf8fc.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "149",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 800_ MSDS  JAN25.pdf",
        productDocName: "Vura DenStone 800_ MSDS  JAN25",
      },
      {
        productDocId: "150",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 800 _ TDS JAN25.pdf",
        productDocName: "Vura DenStone 800 _ TDS JAN25",
      },
    ],
  },
  {
    id: "64",
    product_name: "VURA PoliFill-L",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Premium polyester base transparent liquid\r\n- Low viscosity, therefore very good penetration\r\n- No color of its own, therefore suited for light and white, mainly transparent-crystalline natural stones\r\n- Fast setting and curing time\r\n- Easily to apply and polish\r\n- Good UV stability\r\n- Very good adhesion on natural stone\r\n- Bigger defects, corners and edges can be filled due to slow hardening and low tensions\r\n- Resistant to water, petrol and mineral oils\r\n- Grindable after hardening\r\n",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "33",
    createdAt: "2025-02-10 16:49:28",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "67",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739186368_67a9e0c0da4fd.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "147",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliFill L _ TDS JAN25.pdf",
        productDocName: "VURA PoliFill L _ TDS JAN25",
      },
      {
        productDocId: "148",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliFill L _ MSDS JAN25.pdf",
        productDocName: "VURA PoliFill L _ MSDS JAN25",
      },
    ],
  },
  {
    id: "65",
    product_name: "VURA PoliFill- G ",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Premium polyester base thixotropic transparent gel\r\n- Fast setting and curing time\r\n- Easily to apply and polish\r\n- Good UV Stability\r\n- Very good adhesion on natural stone\r\n- Bigger defects, corners and edges can be ﬁlled due to slow hardening and low tensions - Resistant to water, petrol and mineral oils\r\n- Grindable after hardening\r\n- Colors can be mixed as per desired",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "34",
    createdAt: "2025-02-10 16:50:29",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "68",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739186429_67a9e0fd4ae8a.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "145",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliFill G _ MSDS JAN25.pdf",
        productDocName: "VURA PoliFill G _ MSDS JAN25",
      },
      {
        productDocId: "146",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/VURA PoliFill G _ TDS JAN25.pdf",
        productDocName: "VURA PoliFill G _ TDS JAN25",
      },
    ],
  },
  {
    id: "79",
    product_name: "VURA Robustner",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Ready-to-use one component product\r\n- Easy application\r\n- Weather-resistant and non-yellowing\r\n- Fluid consistency-good penetration\r\n- Very high contents of active substances\r\n- No closing of the pores, the stone retains its ability to breathe\r\n- Transparent-colorless, therefore suited for light colored natural stones\r\n- Solventless",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "48",
    createdAt: "2025-03-12 09:18:25",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "82",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1741751305_67d104095c999.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "117",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Robustner _ TDS MAR25.pdf",
        productDocName: "Vura Robustner _ TDS MAR25",
      },
      {
        productDocId: "118",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Robustner _ MSDS MAR25.pdf",
        productDocName: "Vura Robustner _ MSDS MAR25",
      },
    ],
  },
  {
    id: "82",
    product_name: "Vura Oxi 3K - 1KG",
    productCode: "1",
    productCategory: "1",
    description: "",
    characteristics:
      "- Stain free\r\n- Indoor and Covered Outdoor Use\r\n- Optimized UV and weather resistant\r\n- Stable and uniform colors for all types of tiles/stones\r\n- Easy application and cleaning\r\n- Excellence chemical resistance\r\n- High mechanical strength\r\n- Non-cracking or powering\r\n- Non-Toxic, Anti-bacterial & Anti-Fungal\r\n- Strong, Durable\r\n- Ideal for waterproof grouting\r\n- Vertical resistance/Slip resistance\r\n- Joint width to 1 to 12 mm\r\n- Suitable for the contact with food\r\n- Available in 24 colors",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "60.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "51",
    createdAt: "2025-03-28 13:34:15",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "86",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1743149055_67e657ff068f6.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "108",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ MS MAR 25_2.pdf",
        productDocName: "Vura Oxi 3K _ MS MAR 25_2",
      },
      {
        productDocId: "109",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ MSDS.pdf",
        productDocName: "Vura Oxi 3K _ MSDS",
      },
      {
        productDocId: "110",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ TDS MAR 25_2.pdf",
        productDocName: "Vura Oxi 3K _ TDS MAR 25_2",
      },
    ],
  },
  {
    id: "22",
    product_name: "Vura FasTone S2 (G) 20",
    productCode: "FST S220",
    productCategory: "1",
    description: "HIGHLY DEFORMABLE TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE S2 compliant with EN 12004 standard\r\n- Type 4 T S2 as per IS 15477-2019\r\n- For use on difficult substrates\r\n- For tile and stones of size more than 1200 x 1200 mm\r\n- For indoor and outdoor use\r\n- Application up to 15mm",
    usageGuide: "",
    regularPrice: "2610",
    salesPrice: "990",
    size: "20",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "80.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "8",
    createdAt: "2024-05-06 12:01:32",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "105",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969469_68021efddd5f8.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "54",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone S2.pdf",
        productDocName: "MSDS-FasTone S2",
      },
      {
        productDocId: "55",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone S2.pdf",
        productDocName: "MS-FasTone S2",
      },
      {
        productDocId: "56",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone S2.pdf",
        productDocName: "TDS-FasTone S2",
      },
    ],
  },
  {
    id: "23",
    product_name: "Vura FasTone S2 (W) 20",
    productCode: "FST S220",
    productCategory: "1",
    description: "HIGHLY DEFORMABLE TILE & STONE ADHESIVE",
    characteristics:
      "- C2 TE S2 compliant with EN 12004 standard\r\n- Type 4 T S2 as per IS 15477-2019\r\n- For use on difficult substrates\r\n- For tile and stones of size more than 1200 x 1200 mm\r\n- For indoor and outdoor use\r\n- Application up to 15mm",
    usageGuide: "",
    regularPrice: "3300",
    salesPrice: "1260",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "90.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "9",
    createdAt: "2024-05-06 12:03:51",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "104",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969439_68021edf385b8.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "57",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-FasTone S2.pdf",
        productDocName: "MSDS-FasTone S2",
      },
      {
        productDocId: "58",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-FasTone S2.pdf",
        productDocName: "MS-FasTone S2",
      },
      {
        productDocId: "59",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-FasTone S2.pdf",
        productDocName: "TDS-FasTone S2",
      },
    ],
  },
  {
    id: "66",
    product_name: "VURA Enhanso -1LTR ",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Enriches color\r\n- Maintains the gloss of the polish\r\n- Does not form a layer on the surface of the stone\r\n- Allows the stone to breathe\r\n- Excellent weather and UV resistance\r\n- Durable\r\n- Non-yellowing\r\n- For interior and exterior use\r\n- Long working time\r\n- Imparts wet look\r\n- Water, Oil and dirt resistant",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "100.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "35",
    createdAt: "2025-02-10 16:55:17",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "69",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739186717_67a9e21dd7df3.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "143",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura EnHanso _ TDS JAN25.pdf",
        productDocName: "Vura EnHanso _ TDS JAN25",
      },
      {
        productDocId: "144",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura EnHanso _ MSDS JAN25.pdf",
        productDocName: "Vura EnHanso _ MSDS JAN25",
      },
    ],
  },
  {
    id: "67",
    product_name: "VURA PowerSeal+",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Water and oil-repellent with natural finish\r\n- Excellent anti stain properties\r\n- Easy to clean properties\r\n- Long lasting treatment\r\n- Water based\r\n- Extreme Eco compatible\r\n- The best environmentally-friendly stain protection for porcelain tiles, natural stone, marble and granite with polished, brushed and matt smoothed finishes\r\n- Reduces absorption without affecting the material's natural look\r\n- It protects and facilitates cleaning\r\n",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "100.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "36",
    createdAt: "2025-02-10 17:07:15",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "70",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739187435_67a9e4ebb03dc.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "141",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PowerSeal +_ MSDS JAN25.pdf",
        productDocName: "Vura PowerSeal +_ MSDS JAN25",
      },
      {
        productDocId: "142",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PowerSeal + _ TDS JAN25.pdf",
        productDocName: "Vura PowerSeal + _ TDS JAN25",
      },
    ],
  },
  {
    id: "68",
    product_name: "VURA PowerSeal Pro",
    productCode: "5",
    productCategory: "5",
    description:
      "- Fluoropolymer based chemistry\r\n- Nano impregnating technology\r\n- Oleophobic and Hydrophobic\r\n- Fast curing and development of protective effect\r\n- Low colour enhancement\r\n- Very good oil- and grease stain repellent effect\r\n- Very good reduction of water- and dirt absorption when exposed to moisture and high humidity\r\n- Fast liberation of humidity during dry periods due to high vapor permeability\r\n- Surfaces able to breath because there is no surface layer\r\n- Non yellowing\r\n- Maximum protection against s",
    characteristics: "",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "100.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "37",
    createdAt: "2025-02-10 17:08:09",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "71",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739187489_67a9e5219994e.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "139",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PowerSeal Pro _ TDS JAN25.pdf",
        productDocName: "Vura PowerSeal Pro _ TDS JAN25",
      },
      {
        productDocId: "140",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura PowerSeal Pro _ MSDS JAN25.pdf",
        productDocName: "Vura PowerSeal Pro _ MSDS JAN25",
      },
    ],
  },
  {
    id: "28",
    product_name: "Vura Lastik 5",
    productCode: "LST 5",
    productCategory: "1",
    description: "MULTI-FUNCTIONAL, TWO COMPONENT REACTIVE ADHESIVE",
    characteristics:
      "- Able to absorb stresses\r\n- For areas subject to light chemical attack\r\n- Good workability\r\n- High elasticity, extremely flexible - Resistant to ageing\r\n- Highly Thixotropic\r\n- For indoor and outdoor use",
    usageGuide: "",
    regularPrice: "4305",
    salesPrice: "1860",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "20",
    mou: "",
    couponValue: "120.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "14",
    createdAt: "2024-05-06 12:22:30",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "100",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969238_68021e16c012b.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "69",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-Lastik.pdf",
        productDocName: "MSDS-Lastik",
      },
      {
        productDocId: "70",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-Lastik.pdf",
        productDocName: "MS-Lastik",
      },
      {
        productDocId: "71",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-Lastik.pdf",
        productDocName: "TDS-Lastik",
      },
    ],
  },
  {
    id: "31",
    product_name: "Vura SiGro AD",
    productCode: "SAD",
    productCategory: "1",
    description: "ADMIX FOR CEMENT BASED TILE GROUTS",
    characteristics:
      "- Suitable for Interior & Exterior\r\n- Improves flexibility and durability\r\n- Improves the adhesion strength\r\n- Increase the abrasion resistance of grout\r\n- Reduced water permeability\r\n- Color Fast\r\n- Improves water resistance\r\n- Easy application and Cleaning\r\n- Suitable for submerged conditions",
    usageGuide: "",
    regularPrice: "123",
    salesPrice: "52",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "0.10",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "ml",
    sort_order: "17",
    createdAt: "2024-05-06 12:30:05",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "97",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744967461_68021725f2fad.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "75",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-SiGro-AD.pdf",
        productDocName: "MSDS-SiGro-AD",
      },
      {
        productDocId: "76",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-SiGro-AD.pdf",
        productDocName: "TDS-SiGro-AD",
      },
    ],
  },
  {
    id: "55",
    product_name: "Vura Oxi 3K",
    productCode: "1",
    productCategory: "1",
    description: "",
    characteristics:
      "- Stain free\r\n- Indoor and Covered Outdoor Use\r\n- Optimized UV and weather resistant\r\n- Stable and uniform colors for all types of tiles/stones\r\n- Easy application and cleaning\r\n- Excellence chemical resistance\r\n- High mechanical strength\r\n- Non-cracking or powering\r\n- Non-Toxic, Anti-bacterial & Anti-Fungal\r\n- Strong, Durable\r\n- Ideal for waterproof grouting\r\n- Vertical resistance/Slip resistance\r\n- Joint width to 1 to 12 mm\r\n- Suitable for the contact with food\r\n- Available in 24 colors",
    usageGuide: "",
    regularPrice: "1500",
    salesPrice: "1500",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "24",
    createdAt: "2024-12-02 12:56:13",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "58",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1733124373_674d6115e9467.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "165",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ MSDS.pdf",
        productDocName: "Vura Oxi 3K _ MSDS",
      },
      {
        productDocId: "166",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ MS MAR 25_2.pdf",
        productDocName: "Vura Oxi 3K _ MS MAR 25_2",
      },
      {
        productDocId: "167",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 3K _ TDS MAR 25_2.pdf",
        productDocName: "Vura Oxi 3K _ TDS MAR 25_2",
      },
    ],
  },
  {
    id: "69",
    product_name: "VURA Prevento ",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Nano Impregnating technology\r\n- Hydrophobic and oleophobic based product\r\n- Designed for protection of porous stones\r\n- Preserves natural look\r\n- Weather resistant",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "1",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "38",
    createdAt: "2025-02-10 17:09:53",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "72",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739187593_67a9e58911112.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "137",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Prevento_ MSDS  JAN25.pdf",
        productDocName: "Vura Prevento_ MSDS  JAN25",
      },
      {
        productDocId: "138",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Prevento_ TDS  JAN25.pdf",
        productDocName: "Vura Prevento_ TDS  JAN25",
      },
    ],
  },
  {
    id: "70",
    product_name: "VURA Oxi 4010-5LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Hardens relatively quickly\r\n- It has highly penetrative properties on account of its low viscosity\r\n- Clear transparent, best suitable for light natural stones\r\n- Solvent free epoxy system\r\n- Weather-resistant\r\n- Chemical resistant\r\n- Excellent grinding and polishing properties\r\n- Increases the firmness and improves the quality of natural stone surfaces\r\n- Increases the yield and the productivity\r\n- Excellent product to fill pinholes and cracks of light-colored marble\r\n- Good reactivity at low temperatu",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "39",
    createdAt: "2025-02-10 17:17:15",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "73",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739188036_67a9e74401747.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "135",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 4010 _ TDS JAN25.pdf",
        productDocName: "Vura Oxi 4010 _ TDS JAN25",
      },
      {
        productDocId: "136",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura Oxi 4010 _ MSDS JAN25.pdf",
        productDocName: "Vura Oxi 4010 _ MSDS JAN25",
      },
    ],
  },
  {
    id: "71",
    product_name: "VURA SanStone -5LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Deep penetration\r\n- Easy to use – Brushable / Sprayable\r\n- UV resistance\r\n- Durable\r\n- Water repellent\r\n- Retains breathability of substrate (does not trap moisture)\r\n- Resistance to alkalis\r\n- Tack-free drying\r\n- Invisible coating, does not change the color\r\n- Cost effective",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "40",
    createdAt: "2025-02-10 17:19:14",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "74",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739188154_67a9e7bab6846.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "133",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura SanStone _ MSDS JAN25.pdf",
        productDocName: "Vura SanStone _ MSDS JAN25",
      },
      {
        productDocId: "134",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura SanStone _ TDS JAN25.pdf",
        productDocName: "Vura SanStone _ TDS JAN25",
      },
    ],
  },
  {
    id: "72",
    product_name: "VURA Fiseal+ - 5 LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Water-repellent and consolidating action\r\n- Does not alter the material's appearance\r\n- A VOC-free product with a low environmental impact\r\n- UV resistant\r\n- Breathable\r\n- Blocks contaminants from rising to the material surface\r\n- Easy to use\r\n- Protection against moisture, water and most stains\r\n- Does not substantially alter the adhesion characteristics of the adhesive\r\n- For interior and exterior applications",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "41",
    createdAt: "2025-02-10 17:26:58",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "75",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739188618_67a9e98a3e664.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "131",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal + _ TDS JAN25.pdf",
        productDocName: "Vura FiSeal + _ TDS JAN25",
      },
      {
        productDocId: "132",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal + _ MSDS JAN25.pdf",
        productDocName: "Vura FiSeal + _ MSDS JAN25",
      },
    ],
  },
  {
    id: "73",
    product_name: "VURA FiSeal Pro- 5LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Fluoropolymer based product\r\n- Nano impregnating technology\r\n- Breathable\r\n- Resistance to UV radiation\r\n- The color of the stone is normally not enhanced (preliminary test)\r\n- Enhance adhesion strength\r\n- Reduction of water and dirt absorption during periods of moisture\r\n- Maintenance of breathing properties because there is no surface layer",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "150.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "42",
    createdAt: "2025-02-10 17:28:28",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "76",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739188708_67a9e9e486d6b.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "129",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal Pro _ MSDS JAN25.pdf",
        productDocName: "Vura FiSeal Pro _ MSDS JAN25",
      },
      {
        productDocId: "130",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura FiSeal Pro _ TDS JAN25.pdf",
        productDocName: "Vura FiSeal Pro _ TDS JAN25",
      },
    ],
  },
  {
    id: "29",
    product_name: "Vura Oxi 5",
    productCode: "OXI5",
    productCategory: "1",
    description: "ULTRA EPOXY PREMIUM",
    characteristics:
      "- Indoor and Outdoor Use\r\n- Optimized UV and weather resistant\r\n- Stable and uniform colors for all types of tiles/stones\r\n- Easy application and cleaning as cementitious grout mortar\r\n- Excellent chemical resistance\r\n- High mechanical strength\r\n- Non Toxic, Anti-bacterial & Anti-Fungal\r\n- Strong, Durable\r\n- Ideal for waterproof grouting\r\n- Vertical resistance/Slip resistance\r\n- Can be used as a grout mortar and adhesive\r\n- Joint width 1 to 12 mm\r\n- Suitable for the contact with food\r\n- Available in 24 color",
    usageGuide: "",
    regularPrice: "5100",
    salesPrice: "2181",
    size: "",
    cgst: "9",
    sgst: "9",
    igst: "18",
    hsn_code: "38245090",
    sku_no: "5",
    mou: "",
    couponValue: "200.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "15",
    createdAt: "2024-05-06 12:24:44",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Ceramic",
    productImages: [
      {
        productImgId: "99",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744969214_68021dfe7db14.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "72",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-Oxi.pdf",
        productDocName: "MSDS-Oxi",
      },
      {
        productDocId: "73",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MS-Oxi.pdf",
        productDocName: "MS-Oxi",
      },
      {
        productDocId: "74",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-Oxi.pdf",
        productDocName: "TDS-Oxi",
      },
    ],
  },
  {
    id: "33",
    product_name: "Vura Oxi 7010",
    productCode: "",
    productCategory: "5",
    description: "2 Components, Gel Form, Epoxy Base Thixotropic Glue/paste",
    characteristics:
      "- Very neutral colour & easy to spread\r\n- Low VOC content\r\n- Very low tendency to yellow\r\n- High creeping strength due to gel-like consistency\r\n- Easy dosing and mixing by use\r\n- Weather-resistant bonding\r\n- Good dimensional stability of the bonding layer\r\n- Low tendency to fatigue\r\n- Good adhesion on slightly humid stones\r\n- Very low shrinkage during the hardening process and therefore low tensions in the bonding layer\r\n- Very good alkali-stability, thus the adhesive is very well suited to bond concrete\r\n",
    usageGuide: "",
    regularPrice: "18000",
    salesPrice: "0",
    size: "2.25",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "300.00",
    nonScannableCouponValue: "0.00",
    unit: "Kg",
    sort_order: "19",
    createdAt: "2024-05-06 12:37:52",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "96",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744967408_680216f0f13d3.png",
      },
    ],
    productDocuments: [
      {
        productDocId: "86",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/MSDS-Oxi-7010.pdf",
        productDocName: "MSDS-Oxi-7010",
      },
      {
        productDocId: "87",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/TDS-Oxi-7010.pdf",
        productDocName: "TDS-Oxi-7010",
      },
    ],
  },
  {
    id: "74",
    product_name: "VURA DenStone 200 -5LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Easy application\r\n- Strengthen the surface\r\n- Penetrates and seals new and existing marble, natural stones, terrazzo and concrete\r\n- Improves chemical and water resistance\r\n- Prolongs finish of polished surfaces\r\n- Resists stains and Increase abrasion\r\n- Making surface easy to use and maintain\r\n- Environmentally friendly, water based formula\r\n- Interior and Exterior use\r\n- Protects against efflorescence\r\n- Enhance gloss after polish\r\n- Preserves Natural look",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "300.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "43",
    createdAt: "2025-02-10 17:29:49",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "92",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744886750_6800dbdecf386.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "127",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 200_ MSDS JAN25.pdf",
        productDocName: "Vura DenStone 200_ MSDS JAN25",
      },
      {
        productDocId: "128",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 200 _ TDS JAN25.pdf",
        productDocName: "Vura DenStone 200 _ TDS JAN25",
      },
    ],
  },
  {
    id: "75",
    product_name: "VURA DenStone 800-5LTR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Penetrates and seals new and existing marble, natural stones, terrazzo and concrete\r\n- Improves chemical and water resistance\r\n- Deepens clarity and heightens gloss\r\n- Increase abrasion resistance\r\n- Reduces alkalinity / efflorescence\r\n- Easy to use and maintain\r\n- Interior and exterior use\r\n- User friendly, non-whitening\r\n- Environmentally friendly, water based formula\r\n- VOC compliant",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "5",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "300.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "44",
    createdAt: "2025-02-10 17:30:52",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "91",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1744886591_6800db3f719dd.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "125",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 800_ MSDS  JAN25.pdf",
        productDocName: "Vura DenStone 800_ MSDS  JAN25",
      },
      {
        productDocId: "126",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura DenStone 800 _ TDS JAN25.pdf",
        productDocName: "Vura DenStone 800 _ TDS JAN25",
      },
    ],
  },
  {
    id: "76",
    product_name: "VURA AquaRap WR",
    productCode: "5",
    productCategory: "5",
    description: "",
    characteristics:
      "- Easy to use – Brushable / Sprayable\r\n- UV resistance\r\n- Durable\r\n- Water repellent\r\n- Retains breathability of substrate (does not trap moisture)\r\n- Resistance to alkalis\r\n- Tack-free drying\r\n- Invisible coating, does not change the color\r\n- Cost effective",
    usageGuide: "",
    regularPrice: "0",
    salesPrice: "0",
    size: "20",
    cgst: "",
    sgst: "",
    igst: "",
    hsn_code: "",
    sku_no: "",
    mou: "",
    couponValue: "300.00",
    nonScannableCouponValue: "0.00",
    unit: "L",
    sort_order: "45",
    createdAt: "2025-02-10 17:32:34",
    updatedAt: "2025-05-16 17:23:02",
    deletedAt: "0000-00-00 00:00:00",
    productCategoryName: "Stonecare",
    productImages: [
      {
        productImgId: "79",
        productImg:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_images/1739188954_67a9eadab4a3b.jpg",
      },
    ],
    productDocuments: [
      {
        productDocId: "123",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura AquaRep WR _ TDS JAN25.pdf",
        productDocName: "Vura AquaRep WR _ TDS JAN25",
      },
      {
        productDocId: "124",
        productDocument:
          "https://we.vura.ae/Vura_API_Server/src/uploads/product_documents/Vura AquaRep WR _ MSDS JAN25.pdf",
        productDocName: "Vura AquaRep WR _ MSDS JAN25",
      },
    ],
  },
];
