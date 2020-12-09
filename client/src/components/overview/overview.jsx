import React from 'react';
import './styles.scss';
import ProductDetailsContainer from './productDetails/productDetailsContainer';
import RateCategoryNamePriceContainer from './rateCategoryNamePrice/rateCategoryNamePrice';
import StylesContainer from './stylesContainer/styles';
import SizeQuantityAddContainer from './sizeQuantityAddContainer/sizeQuantityAdd';
import FeaturesContainer from './featuresContainer/featuresContainer';
import SearchBar from './seachBar/searchBar';
import apiCalls from './overviewAPI.mjs';
import ImageGalleryContainers from './imageGalleryContainer/imageGalleryContainers';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: null,
      skuID: null,
      selectedQuantity: null,
      selectedStyle: null,
      productInfo: {},
      productStyles: [],
      window: null,
    };
    this.windowRef = React.createRef();
  }

  apiRequests(productId) {
    apiCalls
      .getProductStyles(productId)
      .then(({ data }) => {
        //console.log(data);
        const defaultStyleIndex = data.results.findIndex(
          (style) => style['default?'] === 1
        );

        if (defaultStyleIndex !== 0) {
          const defaultStyle = data.results[defaultStyleIndex];
          data.results.splice(defaultStyleIndex, 1);
          data.results.unshift(defaultStyle);
        }

        this.setState({
          selectedStyle: data.results[0],
          productStyles: data.results,
        });
      })
      .catch((err) => console.log(err));

    apiCalls
      .getProduct(productId)
      .then(({ data }) => {
        this.setState({
          productInfo: data,
        });
        this.props.onProductNameChange(data.name);
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.apiRequests(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.apiRequests(this.props.productId);

      this.setState({
        selectedSize: null,
        selectedQuantity: null,
        skuID: null,
      });
    }
    if (
      JSON.stringify(this.state.window) !==
      JSON.stringify(this.windowRef.current.getBoundingClientRect())
    ) {
      this.setState({
        window: this.windowRef.current.getBoundingClientRect(),
      });
    }
  }

  changeSelectedStyle(selectedStyle) {
    this.setState({
      selectedStyle: this.state.productStyles.find(
        (style) => style['style_id'] === selectedStyle
      ),
      selectedSize: null,
      selectedQuantity: null,
      skuID: null,
    });
  }

  onSizeSelect(sizeId) {
    document.getElementById('dropButton').style =
      'color: black; font-size: 14px; width: 195px;';
    this.setState({
      selectedSize: this.state.selectedStyle['skus'][sizeId]['size'],
      skuID: sizeId
    });
  }

  onQuantitySelect(quantity) {
    this.setState({
      selectedQuantity: quantity,
    });
  }

  render() {
    return (
      <div
        className='masterContainer'
        style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='overviewContainer' ref={this.windowRef}>
          <div className='headerContainer'>
            <div style={{ width: '100%', height: '100%', backgroundImage: 'url(/images/project-logo.png)', backgroundPosition: 'left', backgroundRepeat: 'no-repeat' }} />
            <SearchBar onSearch={this.props.onSearch} />
          </div>
          <div
            className='siteAnnouncementContainer'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            SITE ANNOUNCEMENT CONTAINER
          </div>
          <ImageGalleryContainers
            photos={
              this.state.selectedStyle
                ? this.state.selectedStyle['photos']
                : null
            }
            window={this.state.window}
          />
          <ProductDetailsContainer
            slogan={this.state.productInfo.slogan}
            description={this.state.productInfo.description}
          />
          <RateCategoryNamePriceContainer
            price={
              !this.state.selectedStyle
                ? null
                : this.state.selectedStyle['sale_price'] === '0'
                  ? this.state.selectedStyle['original_price']
                  : [
                    this.state.selectedStyle['sale_price'],
                    this.state.selectedStyle['original_price'],
                  ]
            }
            category={this.state.productInfo.category}
            name={this.state.productInfo.name}
            reviewData={this.props.reviewData}
          />
          <StylesContainer
            allStyles={this.state.productStyles}
            selectedStyle={this.state.selectedStyle}
            changeSelectedStyle={this.changeSelectedStyle.bind(this)}
          />
          <SizeQuantityAddContainer
            selectedSize={this.state.selectedSize}
            selectedQuantity={this.state.selectedQuantity}
            allSizesAndQuantities={
              this.state.selectedStyle ? this.state.selectedStyle['skus'] : {}
            }
            onSizeSelect={this.onSizeSelect.bind(this)}
            onQuantitySelect={this.onQuantitySelect.bind(this)}
            skuID={this.state.skuID}
          />
          <FeaturesContainer features={this.state.productInfo.features} />
        </div>
      </div>
    );
  }
}

export default Overview;
