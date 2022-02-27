import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faTruck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addProduto } from "../../redux/slicer/cartSlicer";
import api from "../../services/api";
import { NO_IMAGE_URL } from "../../utils/images";
import {
  ValorEntrega,
  Card,
  Price,
  Estoque,
  Details,
  DetailsTitle,
} from "./styles";
import { currencyFormat } from "../../utils/format";
import EditProduto from "../EditProduto/EditProduto";
import { tipoUsuario } from "../../utils/tipoUsuarioEnum";
import "antd/dist/antd.css";
import { notification } from "antd";
import { routes } from "@nabstore/utils";
import Button from "../../components/Button";
import Typography from "../../components/Typografy";
import Anchor from "../../components/Anchor";

const Produto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({
    user: state.user,
    cart: state.cart,
  }));
  const [qtd, setQtd] = useState(1);
  const [produto, setProduto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [entrega, setEntrega] = useState();
  const [cepEntrega, setCepEntrega] = useState("");

  useEffect(() => {
    api
      .fetchProdutoById(id)
      .then((produto) => {
        setProduto(produto);
        const prod = cart.produtos.find((prod) => prod.id === produto.id);
        if (prod) {
          setQtd(prod.qtd);
        }
      })
      .catch((error) => console.error("Erro ao carregar produto."));
  }, [id, cart]);

  const handleDelete = () => {
    if (window.confirm("Deseja deletar o produto?")) {
      api
        .deleteProduto(id)
        .then((produto) => {
          navigate(routes.HOME);
        })
        .catch((error) => console.error("Erro ao deletar produto."));
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduto({
        id: produto.id,
        precoUnit: produto.preco,
        qtd,
        nome: produto.nome,
      })
    );
    const args = {
      message: "Prontinho =)",
      description: "Produto adicionado ao carrinho.",
      duration: 2,
    };
    notification.success(args);
    navigate(routes.HOME);
  };

  const handleEstimarEntrega = () => {
    api
      .getEstimativaEntrega(cepEntrega)
      .then((resp) => setEntrega(resp))
      .catch((err) => console.error("Erro ao calcular entrega."));
  };

  if (!produto) {
    return <div>Carregando dados do produto...</div>;
  }

  return (
    <div className="row align-items-center">
      <EditProduto
        handleClose={() => setShowModal(false)}
        showModal={showModal}
      />
      <div className="col">
        <div className="float-start">
          <Anchor.GoBack path={routes.HOME} text="Voltar aos produtos" />
        </div>
      </div>

      <div className="row align-items-center mt-3 mb-5">
        <div className="col d-flex align-self-start mt-5 justify-content-center">
          <img
            src={api.getImageUrl(produto.id)}
            onError={(e) => (e.target.src = NO_IMAGE_URL)}
            className="img-thumbnail"
            alt={produto.nome}
            width="80%"
          />
        </div>
        <div className="col">
          <Card className="card">
            <div className="card-body">
              <Typography.Title>{produto.nome}</Typography.Title>
              <Typography.Subtitle color="#7e7e7e">ID: {produto.id}</Typography.Subtitle>
            </div>

            <hr />

            <div className="d-flex flex-row justify-content-center mt-2 mb-2">
              <div className="p-2 d-flex flex-column me-4">
                <div className="d-flex justify-content-center">
                  <Price>{currencyFormat(produto.preco)}</Price>
                </div>
                <hr />
                <Estoque>
                  {produto.estoque}{" "}
                  {produto.estoque === 1 ? "disponível" : "disponíveis"} em
                  estoque
                </Estoque>
              </div>

              <div className="p-2 ms-4 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <Button.Primary
                    color="#d95b5b"
                    width="40px"
                    height="40px"
                    margin="20px 10px"
                    onClick={() => setQtd(qtd - 1)}
                    disabled={qtd === 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button.Primary>
                  <span>{qtd}</span>
                  <Button.Primary
                    width="40px"
                    height="40px"
                    margin="20px 10px"
                    onClick={() => setQtd(qtd + 1)}
                    disabled={qtd >= produto.estoque}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button.Primary>
                </div>
                <Button.Primary
                  onClick={handleAddToCart}
                  disabled={produto.estoque === 0 || produto.estoque < qtd}
                >
                  Adicionar ao carrinho
                </Button.Primary>
              </div>
            </div>

            <hr />
            <div className="card-body">
              <DetailsTitle>Detalhes do Produto</DetailsTitle>
              <Details>{produto.descricao}</Details>
            </div>
            {user.tipoUsuarioId === tipoUsuario.COLABORADOR ? (
              <div className="card-body d-flex justify-content-center">
                <Button.Danger
                  width="45%"
                  margin="0 10px"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon className="me-2" icon={faTrash} />
                  Excluir Produto
                </Button.Danger>
                <Button.Secondary
                  width="45%"
                  margin="0 10px"
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon className="me-2" icon={faEdit} />
                  Editar Produto
                </Button.Secondary>
              </div>
            ) : (
              <></>
            )}

            <hr />
            <div className="p-3 card-body ">
              <DetailsTitle>Entrega</DetailsTitle>
              <div className="p-3 card-body d-flex justify-content-center">
                <input
                  type="text"
                  id="cepEntrega"
                  className="form-control"
                  placeholder="00000-000"
                  value={cepEntrega}
                  onChange={(e) => setCepEntrega(e.target.value)}
                />
                <Button.Primary
                  width="45%"
                  margin="0 10px"
                  disabled={cepEntrega === ""}
                  onClick={handleEstimarEntrega}
                >
                  Calcular frete
                </Button.Primary>
              </div>
              {entrega && entrega.estimatedDeliveryDate ? (
                <div className="ms-3 me-3 card-body d-flex justify-content-between align-items-emd">
                  <Details>
                    <FontAwesomeIcon className="me-2" icon={faTruck} />
                    Previsão de entrega dia{" "}
                    {new Date(
                      entrega.estimatedDeliveryDate
                    ).toLocaleDateString()}
                    .
                  </Details>
                  <ValorEntrega>
                    {entrega.preco === 0
                      ? "Grátis"
                      : currencyFormat(entrega.preco)}
                  </ValorEntrega>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Produto;
