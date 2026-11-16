import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Loader from "../../components/common/Loader";
import useProducts from "../../hooks/useProducts";
import PageTitle from "../../components/ui/PageTitle";
import "./Home.css";

const formatNumber = (value) =>
  Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
};

function Home() {
  const { products, isLoading, error, refresh } = useProducts();
  const lowStockProducts = products.filter(
    (product) => product.quantity <= product.reorderLevel,
  );
  const totalUnits = products.reduce(
    (total, product) => total + Number(product.quantity),
    0,
  );
  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.purchasePrice) * Number(product.quantity),
    0,
  );
  const recentProducts = [...products]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    )
    .slice(0, 3);
  const metricValue = (value) =>
    isLoading || error ? "--" : formatNumber(value);

  return (
    <div className="inventory-home">
      <header className="inventory-home__header">
        <div>
          <p className="inventory-home__eyebrow">INVENTORY OPERATIONS</p>
          <PageTitle className="inventory-home__title">
            Inventory overview
          </PageTitle>
          <p className="inventory-home__intro">
            Live product and stock information from your inventory.
          </p>
        </div>
        <Link className="inventory-home__action" to="/product-entry">
          + Add product
        </Link>
      </header>

      <section className="inventory-home__metrics" aria-label="Live inventory metrics">
        <Card title="Products in catalog" className="inventory-metric inventory-metric--primary">
          <strong>{metricValue(products.length)}</strong>
          <span>Products in MongoDB</span>
        </Card>
        <Card title="Low stock items" className="inventory-metric inventory-metric--amber">
          <strong>{metricValue(lowStockProducts.length)}</strong>
          <span>At or below reorder level</span>
        </Card>
        <Card title="Units in stock" className="inventory-metric inventory-metric--blue">
          <strong>{metricValue(totalUnits)}</strong>
          <span>Across listed products</span>
        </Card>
        <Card title="Inventory at cost" className="inventory-metric inventory-metric--rose">
          <strong>{metricValue(inventoryValue)}</strong>
          <span>Purchase price × quantity</span>
        </Card>
      </section>

      <section className="inventory-home__lower">
        <div className="inventory-panel">
          <div className="inventory-panel__heading">
            <div>
              <p className="inventory-home__eyebrow">NEEDS ATTENTION</p>
              <h2>Low stock items</h2>
            </div>
            <Link to="/product-entry">Manage products</Link>
          </div>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="inventory-home__error" role="alert">
              <p>{error}</p>
              <Button type="button" onClick={refresh}>
                Retry
              </Button>
            </div>
          ) : lowStockProducts.length === 0 ? (
            <p className="inventory-home__empty">No products need reordering.</p>
          ) : (
            <div className="inventory-table-wrap">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">SKU</th>
                    <th scope="col">Available</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product.productName}</td>
                      <td>{product.sku}</td>
                      <td>{product.quantity} units</td>
                      <td><span className="stock-status">Reorder</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="inventory-panel inventory-panel--activity">
          <p className="inventory-home__eyebrow">LATEST PRODUCTS</p>
          <h2>Recently added</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <p className="inventory-home__empty">Recent products are unavailable.</p>
          ) : recentProducts.length === 0 ? (
            <p className="inventory-home__empty">No products have been added yet.</p>
          ) : (
            <ul className="activity-list">
              {recentProducts.map((product, index) => (
                <li key={product._id}>
                  <span
                    className={`activity-dot ${
                      index === 1
                        ? "activity-dot--amber"
                        : index === 2
                          ? "activity-dot--blue"
                          : "activity-dot--primary"
                    }`}
                  />
                  <div>
                    <strong>{product.productName}</strong>
                    <p>SKU {product.sku}</p>
                  </div>
                  <time dateTime={product.createdAt}>
                    {formatDate(product.createdAt)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>
    </div>
  );
}

export default Home;